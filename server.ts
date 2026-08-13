import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

interface OrderItem {
  id: string;
  fullName: string;
  phoneNumber: string;
  whatsAppNumber: string;
  email?: string;
  deliveryAddress: string;
  state: string;
  cityTown: string;
  product: string;
  quantity: string;
  usedBefore: string;
  hearAboutUs: string;
  additionalNotes?: string;
  consent: boolean;
  createdAt: string;
  status: "Pending" | "Confirmed" | "Shipped" | "Delivered";
}

// In-memory order storage (persisted during process lifetime)
let orders: OrderItem[] = [
  {
    id: "GS-1001",
    fullName: "Amina Bello",
    phoneNumber: "08031234567",
    whatsAppNumber: "08031234567",
    email: "amina.bello@example.com",
    deliveryAddress: "14 Admiralty Way, Lekki Phase 1",
    state: "Lagos",
    cityTown: "Lekki",
    product: "Complete Glowing Skin Set",
    quantity: "2",
    usedBefore: "No",
    hearAboutUs: "Instagram",
    additionalNotes: "Please deliver before 4 PM",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    status: "Confirmed"
  },
  {
    id: "GS-1002",
    fullName: "Chidimma Okonkwo",
    phoneNumber: "07089876543",
    whatsAppNumber: "07089876543",
    email: "",
    deliveryAddress: "22 Gana Street, Maitama",
    state: "Abuja FCT",
    cityTown: "Abuja",
    product: "Glowing Skin Serum",
    quantity: "1",
    usedBefore: "Yes",
    hearAboutUs: "TikTok",
    additionalNotes: "Call when at the gate",
    consent: true,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    status: "Pending"
  }
];

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/1rLa5qcfsTBJ8ZElOTNXM4Bz1DbsTE-CbIhgQYO4wpVyWsKwszKPLiG-j/exec";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", appName: "Glowing Skin Sales Portal" });
  });

  // Get all orders
  app.get("/api/orders", (_req, res) => {
    res.json({ success: true, count: orders.length, orders });
  });

  // Submit new order
  app.post("/api/orders", (req, res) => {
    try {
      const body = req.body;
      if (!body.fullName || !body.phoneNumber || !body.whatsAppNumber || !body.deliveryAddress || !body.product) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
      }

      const newOrder: OrderItem = {
        id: `GS-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName: body.fullName,
        phoneNumber: body.phoneNumber,
        whatsAppNumber: body.whatsAppNumber,
        email: body.email || "",
        deliveryAddress: body.deliveryAddress,
        state: body.state || "Lagos",
        cityTown: body.cityTown || "",
        product: body.product,
        quantity: body.quantity || "1",
        usedBefore: body.usedBefore || "No",
        hearAboutUs: body.hearAboutUs || "Other",
        additionalNotes: body.additionalNotes || "",
        consent: Boolean(body.consent),
        createdAt: new Date().toISOString(),
        status: "Pending"
      };

      orders.unshift(newOrder);

      // Asynchronously trigger Google Apps Script post to save to Google Sheet / Excel
      fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
        redirect: "follow"
      }).catch((err) => {
        console.error("Google Apps Script sync warning:", err?.message || err);
      });

      res.status(201).json({
        success: true,
        message: "Order submitted successfully and synced to Google Sheets",
        order: newOrder
      });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message || "Failed to save order" });
    }
  });

  // Update order status
  app.patch("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const index = orders.findIndex(o => o.id === id);
    if (index !== -1) {
      orders[index].status = status;
      res.json({ success: true, order: orders[index] });
    } else {
      res.status(404).json({ success: false, message: "Order not found" });
    }
  });

  // Delete order
  app.delete("/api/orders/:id", (req, res) => {
    const { id } = req.params;
    orders = orders.filter(o => o.id !== id);
    res.json({ success: true, message: "Order removed" });
  });

  // Vite Middleware in Dev vs Static in Prod
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
