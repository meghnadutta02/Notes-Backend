import request from "supertest";
import { app, server } from "../server.js";

describe("Authentication", () => {
  let agent; // Declare the agent to persist cookies

  it("should login a user", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "demo@gmail.com",
      password: "password",
      doNotLogout: true,
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers).toHaveProperty("set-cookie");
    const setCookieHeader = response.headers["set-cookie"];

    agent = request.agent(app).set("Cookie", setCookieHeader);
  }, 6000);

  describe("Note Routes", () => {
    let createdNoteId; // To store the ID of the created note

    it("should create a new note", async () => {
      const response = await agent.post("/api/notes/create").send({
        title: "Test Note",
        content: "This is a test note.",
      });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("title", "Test Note");
      expect(response.body).toHaveProperty("content", "This is a test note.");

      // Store the ID of the created note for later tests
      createdNoteId = response.body._id;
    });

    it("should get all notes", async () => {
      const response = await agent.get("/api/notes");

      expect(response.statusCode).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });

    it("should get a specific note by ID", async () => {
      const response = await agent.get(`/api/notes/${createdNoteId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("title", "Test Note");
      expect(response.body).toHaveProperty("content", "This is a test note.");
    });

    it("should update a specific note by ID", async () => {
      const updatedNoteData = {
        title: "Updated Test Note",
        content: "This is the updated test note content.",
      };

      const response = await agent
        .put(`/api/notes/${createdNoteId}`)
        .send(updatedNoteData);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("title", "Updated Test Note");
      expect(response.body).toHaveProperty(
        "content",
        "This is the updated test note content."
      );
    });

    it("should delete a specific note by ID", async () => {
      const response = await agent.delete(`/api/notes/${createdNoteId}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty(
        "message",
        "Note deleted successfully"
      );
    });
    afterAll((done) => {
      server.close(done);
    });
  });
});
