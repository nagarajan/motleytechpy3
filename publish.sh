cd ~/dev/motleytechpy3
git pull
echo "Pulled latest changes"
cp -r output/* /var/www/motleytech/html
cd tasks
cp -r dist /var/www/motleytech/html/tasks
echo "Copied dist to /var/www/motleytech/html/tasks"
sed -i 's|/assets|assets|g' /var/www/motleytech/html/tasks/index.html
echo "Replaced /assets with assets in index.html"
echo "Done"
