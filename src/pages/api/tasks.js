import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  console.log("API /tasks route hit");
  if (req.method === "GET") {
    try {
      const tasks = await prisma.task.findMany();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    try {
      console.log("Updating tasks:", req.body);
      const { toDo, inProgress, done } = req.body;

      await prisma.task.deleteMany();

      await prisma.task.createMany({
        data: [
          ...toDo.map((task) => ({ ...task, status: "toDo" })),
          ...inProgress.map((task) => ({ ...task, status: "inProgress" })),
          ...done.map((task) => ({ ...task, status: "done" })),
        ],
      });

      res.status(200).json({ message: "Tasks updated successfully" });
    } catch (error) {
      console.error("Error updating tasks:", error);
      res.status(500).json({ error: "Failed to update tasks" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}