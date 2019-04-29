const webpack = require('webpack')
const sizeTree = require('webpack-bundle-size-analyzer/build/size_tree')
const config = require('./webpack.config')

webpack(
  config({quiet: true}),
  (err, stats) =>
  sizeTree.dependencySizeTree(
    JSON.parse(JSON.stringify(stats.toJson()))).
    forEach((tree) =>
      sizeTree.printDependencySizeTree(tree)))
