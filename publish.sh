cd ~/dev/motleytechpy3
git pull
echo "Pulled latest changes"
cp -r output/* /var/www/motleytech/html
cd tasks
rm -rf /var/www/motleytech/html/tasks
cp -r dist /var/www/motleytech/html/tasks
echo "Copied dist to /var/www/motleytech/html/tasks"
echo "Done"

