package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Todo struct {
	Id   int    `json:"id"`
	Name string `json:"name"`
	Done bool   `json:"done"`
}

type CreateTodo struct {
	Name string `json:"name"`
}

var todos = make([]Todo, 10)

func main() {

	app := fiber.New()
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "POST,GET,DELETE,PATH,OPTION,PUT",
	}))

	app.Get("/todos", func(c *fiber.Ctx) error {
		return c.JSON(todos)
	})

	app.Post("/todos", func(c *fiber.Ctx) error {
		newCreateTodo := new(CreateTodo)
		if err := c.BodyParser(newCreateTodo); err != nil {
			return err
		}
		todo := new(Todo)
		todo.Id = todos[len(todos)-1].Id + 1
		todo.Done = false
		todo.Name = newCreateTodo.Name
		todos = append(todos, *todo)
		return c.Status(201).JSON(todo)
	})

	err := app.Listen(":3000")
	if err != nil {
		println("cannot run server")
		return
	}
}
