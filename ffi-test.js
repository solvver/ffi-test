var ref=require("ref")
var ArrayType=require("ref-array")
var ffi=require("ffi")


var DoubleArray=ArrayType(ref.types.double)
try{
    console.log("...Trying to load libgsl from library path. GNU Scientific Library should be installed in your system...")
    var libgsl=ffi.Library("libgsl", {"gsl_stats_mean":["double", [DoubleArray, "int", "int"]]})
    console.log("...libgsl loaded")
} catch (err){
    console.log("...libgsl is not installed in your system, trying to load './libgsl.dylib', a MAC OS X compiled version...")
    try{
    var libgsl=ffi.Library("./libgsl.dylib", {"gsl_stats_mean":["double", [DoubleArray, "int", "int"]]})
        console.log("...libgsl loaded")
    } catch(err){
        console.log("...No libgsl available in your system. Please download and install a suitable version from https://www.gnu.org/software/gsl/")
        console.log("...Quiting with error code 1")
        process.exit(1)
    }

}
console.log("...Starting test...")
var res=libgsl.gsl_stats_mean(new DoubleArray([3.2,3.2,3.2]), 1, 3);
if(res==3.2) console.log("TEST SUCCESS. Calculated mean equals expected 3.2 value")
else console.log("TEST FAIL. Mean should be 3.2 but is", res)



