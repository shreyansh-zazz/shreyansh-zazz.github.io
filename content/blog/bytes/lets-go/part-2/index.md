---
title: Basic Primitives & Constants in Go - Let's Go - Part 2
date: "2020-05-24T22:10:04.369Z"
description: In this byte I will be covering about basic premitives and constants in Go and few interesting things on the way.
category: bytes
tags: ["go-lang", "tutorial", "personal"]
isPulished: true
tocEnabled: true
coverURL: "../lets-go.png"
---

# Things to remember

- When we declare a variable in Go without assignment, Go always assigns the zero value to the variable (depending on the type of the variable) instead of assigning `undefined` , `null` or `0`
- Variable declaration is covered in [Variables in Go - Let's Go - Part 1](/bytes/lets-go/part-1/)

# Basic primitive types in Go

- **Boolean** - zero value is `false`
    - `bool`
- **Integer** - zero value is `0`
    - `int8`, `uint8`
    - `byte` is an alias for `uint8`
    - `int16`, `uint16`
    - `int32`, `uint32`
    - `rune` is an alias for `int32`
    - `int64`, `uint64`
- **Floating point** - zero value is `0.0`
    - `float32`
    - `float64`
- **Character** - zero value is `0`
    - `byte` is a 1 byte value, an alias for `uint8` type
    - `rune` is a 4 byte Unicode code-point, an alias for `int32` type
- **String** - zero value is `""` empty string
    - `string` - String in Go is an immutable sequence of bytes (8-bit `byte` values)
- **Enum** - Go doesn't support enumerations, though there is a work around. We will learn more below.

I am not doing much in below program, just showing the basic thing. I will leave it upto you to go crazy with these types, discover, and let me know on [twitter](https://twitter.com/shreyansh_zazz)

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/c24d13ee21defe23223ff412a8b08cbc">Try online</a>
package main

import (
	"fmt"
)

func main() {
	// Basic Primitive types
	var boolType bool
	var integerType int8
	var floatType float32
	var characterType byte
	var stringType string

	fmt.Printf("'%v' ------- %T", boolType, boolType)
	fmt.Printf("\n'%v' ------- %T", integerType, integerType)
	fmt.Printf("\n'%v' ------- %T", floatType, floatType)
	fmt.Printf("\n'%v'------- %T", characterType, characterType)
	fmt.Printf("\n'%v' ------- %T", stringType, stringType)

	// OUTPUT:
	// 'false' ------- bool
	// '0' ------- int8
	// '0' ------- float32
	// '0'------- uint8
	// '' ------- string
}
```

# Constants in Go

## Basics

Go supports constants of character, string, boolean, and numeric values.

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/e6619232722ce9d3591c648f7d0810cb">Try online</a>
package main

import (
	"fmt"
	"math"
)

func main() {
	// we can use const in all places where var can be used, package level, method level, etc.
	
	const pi float32 = 3.14 // typed constant - more on this later
	// pi = 3.1 // if you uncomment this line an error will be thrown, since we're reassigning a constants which is not possible
	fmt.Printf("%v ------- %T", pi, pi)
	
	// in terms of declaration const is similar to var
	const area = "area 52" // untyped constant - more on this later
	fmt.Printf("\n%v ------- %T", area, area)
	
	// we can also group constants just like we do in variables
	const (
		first = 1
		second int = 2
		third = 3
		four = 4
	)
	fmt.Printf("\n%v ------- %T", first, first)
	fmt.Printf("\n%v ------- %T", second, second)
	fmt.Printf("\n%v ------- %T\n", third, third)
	
	const longPi = math.Pi
	
	// we can perform operations on contants but can't change their values
	fmt.Println(math.Sqrt(four))
	fmt.Println(longPi)

	// OUTPUT:
	// 3.14 ------- float32
	// area 52 ------- string
	// 1 ------- int
	// 2 ------- int
	// 3 ------- int
	// 2
	// 3.141592653589793
}
```

## Typed and Untyped Constants

- A typed constant like `const after string = "tomorrow"` will contain the type of the constant from start i.e. when is was declared and assigned.
- whereas, an untyped constant like `const before = "yesterday"` will not have any explicit type, when it is assigned to a variable or used somewhere in the program then that type is provided for that scope only.

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/7f9f63cc276e0a3e33fced71f29ac229">Try online</a>
package main

import (
	"fmt"
)

func main() {
	const one = 1 // untyped constant
	
	// no need to cast here
	var whatIsOneDecimal float32 = one // here a type will be assign to one as float32 because it is getting assigned to a float32 variable
	var whatIsOneInt int32 = one // here a type will be assign to one as int32 because it is getting assigned to a int32 variable
	
	fmt.Println(whatIsOneDecimal)
	fmt.Println(whatIsOneInt)

	// OUTPUT:
	// 1
	// 1
}
```

## iota - whaaaaaaat???

If you want to read more about iota I recommend this blog - [iota](https://www.programming-books.io/essential/go/iota-58a7d48d4d59472a9a7e6fb561771f8d#4c12cc2a-df07-45e5-a822-f95f17bd519a)

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/5ccbf4be1ed39750097fc171b3f5b458">Try online</a>
package main

import (
	"fmt"
)

func main() {
	
	// iota helps us to declare a group of const having sequential values like 1, 2, 3, 4, etc.
	const (
		_ = iota // iota starts counting from 0 and we want from 1 so we have used a blank identifier to skip 0 value
		one
		two
		three
		four
	)

	fmt.Println(one)
	fmt.Println(two)
	fmt.Println(three)
	fmt.Println(four)
	
	const zero = iota // here iota resets to 0
	fmt.Println(zero)

	// OUTPUT:
	// 1
	// 2
	// 3
	// 4
	// 0
}
```

## Enumeration using constant and iota

- As we know Go doesn't support enumeration be default, but we can use constant to replicate enumeration in Go

```go
// Header: <span>main.go</span> <a target="_blank" href="https://codeeval.dev/gist/82267ff30cbb4bdd22dafbede91b906f">Try online</a>
package main

import (
	"fmt"
)

func main() {

	// with the help of iota and constant we are defining enum hypothetically
	const (
		zero = iota // 0
		one // 1
		two // 2
	)

	// since these are untyped constant it can be assigned to any numeric type.
	// if you need different values for different constants you can directly assign the values
	// if we want to declare typed constant as enums we can do that as follows:
	const (
		_ int = iota
		_
		_
		// above by using '_' - blank identifier we are skiping values
		three
		four
		five
	)
	
	fmt.Println(zero)
	fmt.Println(one)
	fmt.Println(two)
	fmt.Println(three)
	fmt.Println(four)
	fmt.Println(five)

	// OUTPUT:
	// 0
	// 1
	// 2
	// 3
	// 4
	// 5
}
```