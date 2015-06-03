# Spectrum testrunner

Spectrum is a standalone project intended to make testing WinRT Javascript apps easier. This work is based on that of [Christopher Bennage](http://dev.bennage.com/blog/2012/08/15/unit-testing-winjs/)

## Why?

Unit testing for Javascript on the WinJS platform is sorely lacking in official support.

## How?

There are two things that you may need to modify in order to get the application to work:

#### .jsproj file

You need to link the project into the application that you want to test. This is done through the Spectrum.jsproj file. In order to link in your project modify the Content Includes to link into your project. In the example below I'm linking into a project called oauth-lib-test that is relatively linked to 3 folders up from Spectrum.

When we link in the project, we link in the source and spec folders seperately. Source files are linked into Spectrum under includes/source, while spec files are linked into includes\specs. If either of these folders do not exist within the Spectrum project, a WinRT error will be raised.

```
<Content Include="..\..\..\oauth-lib-test\js\**\*.js">
	<Link>includes\source\%(RecursiveDir)%(Filename)%(Extension)</Link>
	<CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
</Content>
```

#### default.js

By default the application will be configured to test basic expectations, sinon and sinon-chai. In order to set the application to test your linked application you should change the ```runLinkedTests = false``` to true`.