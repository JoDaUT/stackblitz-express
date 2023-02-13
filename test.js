const request = require("supertest");
const baseURL = "http://localhost:3010";

describe("GET /device", () => {
  it("should return a list of devices", async () => {
    const response = await request(baseURL).get("/device");

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("rows");
    expect(Array.isArray(response.body.data.rows)).toBe(true);
  });
});

describe("POST /device", () => {
  const device = {
    name: "Printer 5",
    type: "Ender V3",
    status: "Online",
    ip: "192.168.3.asdfas",
    deviceType: "3dPrinter",
    factoryId: 1,
  };
  it("should not allow invalid IP addresses", async () => {
    const device = {
      name: "Printer 5",
      type: "Ender V3",
      status: "Online",
      ip: "192.168.3.xxxxxxx",
      deviceType: "3dPrinter",
      factoryId: 1,
    };
    const response = await request(baseURL).post("/device").send(device);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("POST /device", () => {
  it("should not allow an invalid factory id", async () => {
    const device = {
      name: "Printer 5",
      type: "Ender V3",
      status: "Online",
      ip: "192.168.3.9",
      deviceType: "3dPrinter",
      factoryId: 100000,
    };
    const response = await request(baseURL).post("/device").send(device);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("POST /device", () => {
  const device = {
    name: "Printer 5",
    type: "Ender V3",
    status: "Online",
    ip: "192.168.3.asdfas",
    deviceType: "3dPrinter",
    factoryId: 1,
  };
  it("should not allow an invalid status", async () => {
    const device = {
      name: "Printer 5",
      type: "Ender V3",
      status: "Active",
      ip: "192.168.3.9",
      deviceType: "3dPrinter",
      factoryId: 1,
    };
    const response = await request(baseURL).post("/device").send(device);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("POST /device", () => {
  const device = {
    name: "Printer 5",
    type: "Ender V3",
    status: "Online",
    ip: "192.168.3.9",
    deviceType: "3dPrinter",
    factoryId: 1,
  };
  it("should create a 3d printer device with the specified name, type, status, IP, and device string", async () => {
    const response = await request(baseURL).post("/device").send(device);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("device");
  });
});

describe("POST /device", () => {
  const device = {
    name: "Furn 2",
    ip: "192.168.3.10",
    type: "Combi",
    status: "Online",
    deviceType: "Furnance",
    factoryId: 2,
    details: {
      maxTemperature: 500,
    },
  };
  it("should create a furnance device with the specified name, type, status, IP, and device string", async () => {
    const response = await request(baseURL).post("/device").send(device);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("device");
  });
});

describe("POST /device", () => {
  const device = {
    name: "QC 2",
    ip: "192.168.3.11",
    type: "Rapid",
    status: "Online",
    deviceType: "qualityCheckDevice",
    factoryId: 1,
    details: {
      capacity: 5,
    },
  };
  it("should create a quality check device with the specified name, type, status, IP, and device string", async () => {
    const response = await request(baseURL).post("/device").send(device);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("device");
  });
});

describe("POST /device", () => {
  it("shout not allow duplicated devices with same IP address and factory", async () => {
    const device = {
      name: "Printer 5",
      type: "Ender V3",
      status: "Online",
      ip: "192.168.3.9",
      deviceType: "3dPrinter",
      factoryId: 1,
    };
    const response = await request(baseURL).post("/device").send(device);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("DELETE /device/:id", () => {
  it("should delete a device with the specified ID", async () => {
    const id = "1";
    const response = await request(baseURL).del(`/device/${id}`);
    expect(response.status).toBe(200);

    const loadDataResponse = await request(baseURL).get("/device");
    const device = loadDataResponse.body.data.rows.find((d) => d.id === id);
    expect(device).toBeUndefined();
  });
});

describe("DELETE /device/:id", () => {
  it("should not allow to deleted and object that does not exists", async () => {
    const id = 10000000;
    const response = await request(baseURL).del(`/device/${id}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("PUT /device/:id", () => {
  it("should update a device", async () => {
    const id = 5;
    const device = {
      name: "Furn 1-updated",
      ip: "192.168.3.8",
      type: "Combi",
      status: "Online",
      factoryId: 1,
      details: {
        maxTemperature: 150,
      },
    };

    const response = await request(baseURL).put(`/device/${id}`).send(device);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe(device.name);
    expect(response.body.ip).toBe(device.ip);
    expect(response.body.type).toBe(device.type);
    expect(response.body.status).toBe(device.status);
    expect(response.body.factoryId).toBe(device.factoryId);
  });
});

describe("PUT /device/:id", () => {
  it("should not update a device that does not exist", async () => {
    const id = 5000;
    const device = {
      name: "Furn 1-updated",
      ip: "192.168.3.8",
      type: "Combi",
      status: "Online",
      factoryId: 1,
      details: {
        maxTemperature: 150,
      },
    };

    const response = await request(baseURL).put(`/device/${id}`).send(device);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});

describe("PUT /device/:id", () => {
  it("should not update a device if the body is invalid", async () => {
    const id = 3;
    const device = {
      name: "Furn 1-updated",
      ip: "192.168.3.8",
      type: "Combi",
      status: "Active",
      factoryId: 1,
      details: {
        maxTemperature: 150,
      },
    };

    const response = await request(baseURL).put(`/device/${id}`).send(device);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors));
    expect(response.body.errors.length).toBeGreaterThan(0);
  });
});
