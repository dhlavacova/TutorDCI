import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
    const { createTask, getTask, updateTask } = useTasks();
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (params.id) {
                updateTask(params.id, {
                    ...data,
                    date: dayjs.utc(data.date).format(),
                });
            } else {
                createTask({
                    ...data,
                    date: dayjs.utc(data.date).format(),
                });
            }

            // navigate("/tasks");
        } catch (error) {
            console.log(error);
            // window.location.href = "/";
        }
    };

    useEffect(() => {
        const loadTask = async () => {
            if (params.id) {
                const task = await getTask(params.id);
                setValue("title", task.title);
                setValue("description", task.description);
                setValue(
                    "date",
                    task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
                );
                setValue("completed", task.completed);
            }
        };
        loadTask();
    }, []);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button onPress={onOpen}>Open Modal</Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                            <ModalBody>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Label htmlFor="theme">Choose a Theme</Label>
                                    <select name="theme" {...register("theme")}
                                        className="block w-full bg-zinc-700 text-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
                                        <option value="web-development">Web Development</option>
                                        <option value="programming-languages">Programming Languages</option>
                                        <option value="frontend">Frontend Development</option>
                                        {/* Agrega más opciones de tema aquí */}
                                    </select>

                                    <Label htmlFor="customTheme">Or Specify Your Theme</Label>
                                    <Input
                                        type="text"
                                        name="customTheme"
                                        placeholder="Enter your own theme"
                                        {...register("customTheme")}
                                    />

                                    <Label htmlFor="tutor" className="block font-semibold mb-2">
                                        Choose a Tutor
                                    </Label>
                                    <select
                                        name="tutor"
                                        {...register("tutor")}
                                        className="block w-full bg-zinc-700 text-white p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                                    >
                                        <option value="tutor-1">Tutor 1</option>
                                        <option value="tutor-2">Tutor 2</option>

                                    </select>


                                    <Button type="submit">Continue</Button>
                                </form>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}



import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Button, Card, Input, Label } from "../components/ui";
import { useTasks } from "../context/tasksContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
dayjs.extend(utc);

export function TaskFormPage() {
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (params.id) {
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      } else {
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(),
        });
      }

      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // window.location.href = "/";
    }
  };

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };
    loadTask();
  }, []);

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Label htmlFor="theme">Choose a Theme</Label>
        <select name="theme" {...register("theme")}
          className="block w-full bg-zinc-700 text-white px-4 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300">
          <option value="web-development">Web Development</option>
          <option value="programming-languages">Programming Languages</option>
          <option value="frontend">Frontend Development</option>
          {/* Agrega más opciones de tema aquí */}
        </select>

        <Label htmlFor="customTheme">Or Specify Your Theme</Label>
        <Input
          type="text"
          name="customTheme"
          placeholder="Enter your own theme"
          {...register("customTheme")}
        />

        <Label htmlFor="tutor" className="block font-semibold mb-2">
          Choose a Tutor
        </Label>
        <select
          name="tutor"
          {...register("tutor")}
          className="block w-full bg-zinc-700 text-white p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="tutor-1">Tutor 1</option>
          <option value="tutor-2">Tutor 2</option>

        </select>


        <Button type="submit">Continue</Button>
      </form>
    </Card>

  );
}

