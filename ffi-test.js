var ref=require("ref")
var ArrayType=require("ref-array")
var ffi=require("ffi")

var DoubleArray=ArrayType(ref.types.double)
var libgsl=ffi.Library("libgsl", {"gsl_stats_mean":["double", [DoubleArray, "int", "int"]]})

var d=new Date();
var res=libgsl.gsl_stats_mean(new DoubleArray([3.2,3.2,3.2]), 1, 3);
console.log(res)
console.log("sync", new Date().getTime()- d.getTime())


