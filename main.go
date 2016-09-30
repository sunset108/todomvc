package main

import (
	"todomvc/controllers"

	"github.com/astaxie/beego"
)

func main() {
	beego.Router("/", &controllers.MainController{})
	beego.Router("/task/", &controllers.TaskController{}, "get:ListTasks;post:NewTask;put:CompleteAllTasks;delete:ClearCompleted")
	beego.Router("/task/:id:int", &controllers.TaskController{}, "get:GetTask;put:UpdateTask;delete:DeleteTask")
	beego.Run()
}
