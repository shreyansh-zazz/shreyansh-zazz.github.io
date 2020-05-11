---
title: Let's Go
date: "2020-05-10T18:05:47.555Z"
description: This byte is a series of blogs on Go Programming Language.
category: bytes
tags: ["go-lang", "tutorial", "personal"]
---

# Go Facts check

- Go attempts to reduce the amount of typing, as in writing code for a feature or just the syntax which end up reducing clutter and complexity in codebase.
- Go is compiled. There's no VM and after compilation it creates only one executable file without any dependencies, hence no dependency hell. Upload it anywhere and run, it will work like a charm (_did I mention that this exec file is cross-platform_?).
- Go is 🐅 (_fast_) and 🔏 (_safe_). Strong and static typed, garbage collected and reliable to some extends. Go provides compile time safety and runtime safety to some extends only.
- Go supports (kind of) OOP. Go has types and method but there's no type hierarchy (no type inheritance). Though Go does support interface which is very lightweight but the approach is different from OOP. In a nutshell it support an implicit style of type dependency.
- Go wants you to compose things not inherit like in other OOP languages.
- Go supports functional programming (FP). e.g., Go supports anonymous functions, closures, and first-class functions.
- Go has built-in concurrency. There are no heavy threads but goroutines (later about this). Go removes all the complexity that comes while writing asynchronous code and provide a simple way to structure the programs in a more maintainable way.
- Go is a simple to use super car which can take you to production from development in no time but safety is not guaranteed. If you're looking for safety take a look at [Rust](https://www.rust-lang.org/).

To setup Go locally go to [this link](https://golang.org/) and follow instructions. Now let's jump in and see how we declare variables and stuff in Go.

# Declare `var` not love

In Go there are different ways to declare variables but each one have it's own meaning. In this section we will go through all the different types we can declare a variable and constants in go.

## Variables fact check

- Go doesn't allow you to define unused variables, it will throw error in compile time. This feature helps in reducing clutter from the codebase,
- Declaring variables in Go is pretty much different from declaring variables in C or Java. In C we specify the type of variable to the left of declaration e.g. `int a;` but in Go the types comes on right side of declaration `var a int`. The reason for that is that Go follows a different Declaration Syntax, more on that [here](https://blog.golang.org/declaration-syntax).
- When we declare a variable in Go e.g. `var i int` the variable is initialized to the zero value of respective type.
