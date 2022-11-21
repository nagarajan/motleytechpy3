Title: Orbit Camera for 3D scenes
Date: 2019-08-12 17:22
Category: Blog
Tags: 3D, camera, orbit
Authors: Nagarajan
Disqus_Identifier: 3dOrbitCamera

Recently, I was playing with the [Zygote body Google Experiments](https://experiments.withgoogle.com/body-browser), and noticed that the supported camera controls were very constraining. The zoom in, zoom out and rotation was all centered around the Y axis, rather than the object underneath the mouse pointer. This made it difficult to zoom into or rotate around the parts of interest (the "object of interest" is locked as the Y axis).

I wondered about this problem, and figured I could use my graphics and math knowledge to create camera controls capable of changing the "object of interest" to the thing under the mouse pointer.

Here is a set of new mouse control (built on top of three.js) which allow the user to rotate around the object under the mouse pointer.

Controls

- Right click to orbit
- Mouse wheel to zoom in/out.


<div class='3dSceneContainer'>
    <canvas id="playground" style="width: 800px; height 600px; display: block"></canvas>
</div>

Figuring out the exact rotations turned out to be a nice little challenge, but the final code is fairly straight forward. The three.js matrix operations make it fairly easy to implement the new orbit method (once the required rotations have been figured out).

```

  function orbit(xRot, yRot, camPos, camLookAt, target) {
    const newXAxis = camLookAt.clone();
    const lx = camLookAt.x;
    const lz = camLookAt.z;
    // horizontal axis perpendicular to the camera lookat
    newXAxis.x = -lz;
    newXAxis.z = lx;
    newXAxis.y = 0;

    // the .sub() and .add() wrt target are to make sure we do rotations
    // wrt to the target position, and not to the origin
    const newCamPos = camPos
    .sub(target)
    .applyAxisAngle( newXAxis, xRot ) // up / down rotation
    .applyAxisAngle( yaxis, yRot ) // left / right rotation
    .add(target);
    camera.position.set(...newCamPos.toArray());


    // rotate the lookat direction exactly equal to the rotation
    const relLookAt = camLookAt
    .applyAxisAngle( newXAxis, xRot )
    .applyAxisAngle( yaxis, yRot )
    .add(newCamPos);
    camera.lookAt(...relLookAt.toArray());

    camera.updateProjectionMatrix();
  }

  // retrieve the target under the mouse pointer
  function getTarget(camera, event, highlight=false) {
    const [x, y] = [event.offsetX, event.offsetY];
    const [cw, ch] = [canvas.width, canvas.height];
    const mouse3D = new THREE.Vector3( ( x / cw ) * 2 - 1,
                                      -( y / ch ) * 2 + 1,
                                      0.5 );
    const raycaster =  new THREE.Raycaster();
    raycaster.setFromCamera( mouse3D, camera );
    const intersects = raycaster.intersectObjects( objects );
    const nv = new THREE.Vector3();
    camera.getWorldDirection(nv);
    console.log({ raycaster, intersects, nv });
    if ( intersects.length > 0 ) {
      if (highlight) {
        addHighlight(intersects[0].object);
      }
      return intersects[0].object.position.clone();
    }

    return camera.position.clone().add(raycaster.ray.direction.clone().multiplyScalar(300));
  }

```

The souce code for the above demo can be found in my github repo [here](https://github.com/nagarajan/motleytechpy3/blob/master/content/js/orbit-camera/controls.js).

Please feel free to go ahead and use it in your non-commercial code. Please drop me a line to let me know if you found it useful and are using it. For commercial code, please contact me directly at my [email address](mailto:nag.rajan@gmail.com).

<link rel="stylesheet" href="/css/orbit-camera/app.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/110/three.min.js"></script>
<script src="/js/orbit-camera/controls.js"></script>
