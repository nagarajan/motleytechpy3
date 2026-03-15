source venv/bin/activate
make html
echo "Built blog files"
cd tasks
npm run build
echo "Built tasks files"
echo "Done"
