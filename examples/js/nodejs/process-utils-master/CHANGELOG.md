# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="2.0.1"></a>
## [2.0.1](https://github.com/medikoo/process-utils/compare/v2.0.0...v2.0.1) (2018-10-02)


### Bug Fixes

* ensure set and defined properties are stringified ([6b94dc7](https://github.com/medikoo/process-utils/commit/6b94dc7)), closes [#1](https://github.com/medikoo/process-utils/issues/1)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/medikoo/process-utils/compare/v1.1.0...v2.0.0) (2018-09-20)


### Features

* **override-env:** change contract, allow to override over async calls ([a15b894](https://github.com/medikoo/process-utils/commit/a15b894))
* add overrideStdoutWrite and overrideStderrWrite utils ([a487c4c](https://github.com/medikoo/process-utils/commit/a487c4c))


### BREAKING CHANGES

* **override-env:** Handling of overrideEnv change.
Instead of exposing overriden env to time of invocation of passed
callback, it now returns `restoreEnv` function which should be called
after we wish process.env to be restored.
This allows to override process.env over async calls



<a name="1.1.0"></a>
# [1.1.0](https://github.com/medikoo/process-utils/compare/v1.0.0...v1.1.0) (2018-05-30)


### Features

* for convience pass through callback result ([f6d5beb](https://github.com/medikoo/process-utils/commit/f6d5beb))



<a name="1.0.0"></a>
# 1.0.0 (2018-05-30)
