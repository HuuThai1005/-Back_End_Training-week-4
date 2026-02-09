import { Router } from "express";
import { StoreService } from "../service/store.service";
import { authMiddleware, requireRole } from "../middleware/auth.middleware";

const router = Router();
const storeService = new StoreService();

router.get("/stores",  authMiddleware, requireRole(["ADMIN"]), async (req, res) => {
  try {
    const stores = await storeService.getAllStores();
    res.json(stores);
  } catch (err: any) {
    if (err.message === "NO_STORES_FOUND") {
        return res.status(404).json({ message: "No stores found" });
  }
}
});

router.post("/add-store",  authMiddleware, requireRole(["ADMIN"]), async (req, res) => {
    try {
        const { storeName } = req.body;
        const newStore = await storeService.createStore(storeName);
        res.status(201).json({message: "Store created successfully", store: newStore });
    } catch (err: any) {
        if (err.message === "STORE_ALREADY_EXISTS") {
            return res.status(400).json({ message: "Store already exists" });
        }   
        if (err.message === "INVALID_STORE_NAME") {
            return res.status(400).json({ message: "Invalid store name" });
        }
    }
});

router.post("/add-book-to-store", authMiddleware, requireRole(["ADMIN"]), async (req, res) => {
    try {
        const { storeId, bookId, amount } = req.body;   
        const result = await storeService.addBookToStore(storeId, bookId, amount);
        res.status(201).json({ message: "Book added to store successfully", storeBook: result });
    }
    catch (err: any) {
        if (err.message === "BOOK_ALREADY_IN_STORE") {
            return res.status(400).json({ message: "Book already in store" });
        }
        if (err.message === "INVALID_AMOUNT") {
            return res.status(400).json({ message: "Invalid amount" });
        }
        if (err.message === "INVALID_STORE_OR_BOOK_ID") {
            return res.status(400).json({ message: "Invalid store or book ID" });

    }
}
}
); 

router.post("/store-books", authMiddleware, requireRole(["ADMIN"]), async (req, res) => {
    try {
        const { storeId } = req.body;   
        const storeBooks = await storeService.getAllStoreBooks(storeId);
        res.json(storeBooks);
    } catch (err: any) {
        if (err.message === "INVALID_STORE_ID") {
            return res.status(400).json({ message: "Invalid store ID" });
        }
        if (err.message === "STOREID_MUST_BE_POSITIVE_NUMBER") {
            return res.status(400).json({ message: "Store ID must be a positive number" });
        }
    }
});
export default router;
