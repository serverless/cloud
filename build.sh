git clean -xdf
rm -rf build
mkdir -p build
for d in templates/* ; do
    pushd $d
    out=$(basename $d)
    zip -r "../../build/${out}.zip" .
    popd
done
