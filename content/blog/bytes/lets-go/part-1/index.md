---
title: Variables in Go - Let's Go - Part 1
date: "2020-05-24T22:03:26.188Z"
description: In this byte I will be explaining variable declaration, and few important fact checks about Go
category: bytes
tags: ["go-lang", "tutorial", "personal"]
isPulished: true
tocEnabled: true
coverURL: "../lets-go.png"
---

# Hello Go

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/75f95939d1cda10a95703d44043451c3">Try online</a>
package main

import (
	"fmt"
)

func main() {
	fmt.Println("Let's Go....")
}
```

## Go Facts check

- Go attempts to reduce the amount of typing, as in writing code for a feature or just the syntax which end up reducing clutter and complexity in codebase.
- Go is compiled. There's no VM and after compilation it creates only one executable file without any dependencies, hence no dependency hell. Upload it anywhere and run, it will work like a charm (_did I mention that this exec file is cross-platform_?).
- Go is 🐅 (_fast_) and 🔏 (_safe_). Strong and static typed, garbage collected and reliable to some extends. Go provides compile time safety and runtime safety to some extends only.
- Go supports (kind of) OOP. Go has types and method but there's no type hierarchy (no type inheritance). Though Go does support interface which is very lightweight but the approach is different from OOP. In a nutshell it support an implicit style of type dependency.
- Go wants us to compose things not inherit like in other OOP languages.
- Go supports functional programming (FP). e.g., Go supports anonymous functions, closures, and first-class functions.
- Go has built-in concurrency. There are no heavy threads but goroutines (later about this). Go removes all the complexity that comes while writing asynchronous code and provide a simple way to structure the programs in a more maintainable way.
- Go is a simple to use super car which can take us to production from development in no time but safety is not guaranteed. If you're looking for safety take a look at [Rust](https://www.rust-lang.org/).

To setup Go locally go to [this link](https://golang.org/) and follow instructions. Now let's jump in and see how we declare variables and stuff in Go.

# Declare `var` not war

In Go there are different ways to declare variables but each one have it's own meaning. In this section we will go through all the different types we can declare a variable and constants in go.

## Variables fact check

- Go is statically typed language, we know the type of a defined variable at compile time.
- Go doesn't allow us to define unused variables, it will throw error at compile time. This feature helps in reducing clutter from the codebase,
- Declaring variables in Go is somewhat different from declaring variables in C or Java, syntax wise. In C we specify the type of variable to the left of declaration e.g. `int a;` but in Go the types comes on right side of declaration `var a int`. The reason for that is that Go follows a different Declaration Syntax, more on that [here](https://blog.golang.org/declaration-syntax).
- When we declare a variable in Go e.g. `var i int` the variable is initialized to the zero value of respective type.

## Variable declaration

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/91adfb498aa666cd393e7bffd00e23cf">Try online</a>
package main

import (
	"fmt"
)

// These are package level variables
var x int = 0
var y string

func main() {
	// Below declared varibles are method level varibles

	// Declare variable i with type int
	var i int
	i = 10         // initialize variable i with int 10
	fmt.Println(i) // simply print the i on console
	// with below code, we can print formatted string on console

	// INFO: in Go %v is used to print a value of any type where as %T tells the type of the variable passed
	// INFO: \n is an escape character for new line
	fmt.Printf("Value ---> %v\nType ---> %T", i, i)

	var j int = 11 // this way we can assign the varible while declaring

	// this way we can group valiable declaration
	var (
		a int     = 1
		b string  = "two"
		c float64 = 3.0
	)
	// there's one more way to declare multiple varibles at once as below
	// var a, b, c string -- this way the type will be same string for all three
	// var a, b, c stirng = "a", "b", "c" -- this way we can assign them as well while declaring
	// a, b, c := 1, "two", 3.0 -- this way we can declare with different types

	y = "package level var" // here we are assign value to y - package level variable

	fmt.Printf("\n%v %v %v %v %v %v", x, y, j, a, b, c)

	// if we don't want to explicitly tell Go the type of a varible we can do that as follows
	noType := "I am not explicitly declared" // this way at compile time go will assign the type string to variable noType
	fmt.Printf("\n%v", noType)

	// NOTE: := this syntax declares a new varible so we cannot redeclare an existing one neither we can change the type of an existing variable.
	// NOTE: this := way of defining varible doesn't work for package level variables.
}

// OUTPUT
// 10
// Value ---> 10
// Type ---> int
// 0 package level var 11 1 two 3
// my type was not explicitly declared
```

## Variables shadowing

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/89cd64a8f33b0438164b1b2ac907dd40">Try online</a>
package main

import (
	"fmt"
)

// to demonstrate variable shadowing lets first declare a variable at package level
var hero = "I am inevitable"

func main() {
	fmt.Printf("\n%v", hero) // OUTPUT: I am inevitable

	// with redeclaration below we are shadowing the variable hero at package leve
	hero := "I am Iron man" // or we can do this var hero string = "I am Iron Man". Both are the same, either way we are declaring a var.
	fmt.Printf("\n%v", hero) // OUTPUT: I am Iron man

	var hero string = "Love you 3000" // NOTE: this will throw an error, Go doesn't allow to redeclare same variable in the same scope
}
```

## Variable visibility

So far we have seen in our last few program example that we are naming our variable with lowercase letter. Well there's good reason for that as described below in the program:

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/c5b5d43c0e552cf0f1586f2fdf5fada4">Try online</a>
package main

import (
	"fmt"
)

// NOTE: There are three variable scopes that are available in Go,
// Block Level (variables defined inside method), Package level (variables declared on package level), Export Level (variables defined with uppercase in package level)

var Pi float32 = 3.14 // notice that variable name starts with an uppercase letter which means it will be export and can be accessed by other packages also.
var configNumber int = 0 // notice that variable name starts with a lowercase letter which means it will be accessible within this package only.

func main() {
	increament := 0 // this variable is scoped within main() method and we cannot access it outside this method
	fmt.Printf("%v %v %v", Pi, configNumber, increament) // OUTPUT: 3.14 0 0
}
```

## Variable naming best practice

Go asks developers to declare a variable name in such a way that the length of the variable name defines the life of that variable. e.g.

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/2c21e6510bc4597e9ebe1d23ebf40721">Try online</a>
package main

import (
	"fmt"
)

func main() {
	i := 0 // we can name a varible this short if the lifespan of this variable is very small e.g. if we are using a for loop and i is for counter
	theURL := "https://golang.org" // this variable has a decent name since the lifespan will be more, also notice the acronym is in uppercase which is a good practice in Go since it is more readable
	fmt.Printf("%v %v", i, theURL) // OUTPUT: 0 https://golang.org
}
```

## Variables type conversion

Go doesn't allow implicit type conversion, it has to be explicit.

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/0b240b08ebb6222cc850d6d6fcbe4264">Try online</a>
package main

import (
	"fmt"
	"strconv"
)

func main() {
	var i int = 10 // here i is of type int
	var j float32 = float32(i) // here we are converting i int to a float32 type
	// to verify this we will print both values and types
	fmt.Printf("%v %T\n%v %T", i, i, j, j)
	// OUTPUT:
	// 10 int
	// 10 float32

	// we can also convert float to int but that will result into data loss e.g. 10.5 will become 10 in int
	// now lets try to convert an int into string
	var integerValue int = 65
	var stringValue string = string(integerValue) // here while converting Go will replace 65 with it's corresponding character in ASCII table i.e. A
	fmt.Printf("%v %T\n%v %T", integerValue, integerValue, stringValue, stringValue)
	// OUTPUT:
	// 65 int
	// A string

	// to convert int directly to string we can using Go native package strconv which we have imported on top
	var stringOriginalValue = strconv.Itoa(integerValue) // here Itoa means Integer to ASCII, and remember why I is capital in Itoa because it is exported from strconv package
	fmt.Printf("%v %T\n%v %T", integerValue, integerValue, stringOriginalValue, stringOriginalValue)
	// OUTPUT:
	// 65 int
	// 65 string
}
```

## Variables type alias

Originally type alias in Go was introduced to make it easier to refactor codebase, with the help of following example we can see how

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/a3cc4a4a6e388c2e3585141227142f01">Try online</a>
package main

import (
	"fmt"
)

func main() {
	// let's assume 'float32' is a type coming from xyz package that we're importing from somewhere
	// now this xyz package exports 'float32' type that we can use here
	// suppose if in future, inside xyz package, we want to rename the 'float32' type to say 'float64', this can cause a problem
	// we then have to search for all the packages that are using 'float32' then replace each instances with 'float64'
	// here type alias can help as follows
	
	type float = float32 // assume its xyz.Float32
	// here we are using 'type' keyword to alias xyz.Float32 before using it anywhere in the package

	var pi float = 3.14
	fmt.Println(pi) // using Pie here in the package

	// suppose we have renamed the xyz.Float32 to xyz.Float64 in the xyz package
	// now here we can just change the xyz.Float32 to xyz.Float64 in the type alias and everything will still work the same
	// type float = xyz.Float32 will become type float = xyz.Float64, and everything will work as expected in this package

	// OUTPUT:
	// 3.14
}
```
