import { storeRepo } from "../../repositories/store/store.repo";
export class StoreService {
  async createStore(storeName: string, regionId: number) {
    const existingStore = await storeRepo.findStoreByName(storeName);
    if (existingStore) {
      throw new Error("STORE_ALREADY_EXISTS");
    }
    if (!storeName || storeName.trim() === "") {
      throw new Error("INVALID_STORE_NAME");
    }
    if (!regionId || regionId <= 0) {
      throw new Error("INVALID_REGION_ID");
    }
    return storeRepo.createStore({ storeName, regionId });
  }

  async addBookToStore(storeId: number, bookId: number, amount: number) {
    const existingBook = await storeRepo.findBookById(storeId, bookId);
    if (existingBook) {
      throw new Error("BOOK_ALREADY_IN_STORE");
    }
    if (amount <= 0 || !Number.isInteger(amount)) {
      throw new Error("INVALID_AMOUNT");
    }
    if (!storeId || !bookId) {
      throw new Error("INVALID_STORE_OR_BOOK_ID");
    }
    return storeRepo.addBookToStore({ storeId, bookId, amount });
  }

  async getAllStores() {
    const stores = await storeRepo.getAllStores();
    if (stores.length === 0) {
      throw new Error("NO_STORES_FOUND");
    }
    return stores;
  }

  async getAllStoreBooks(storeId: number) {
    if (!storeId) {
      throw new Error("INVALID_STORE_ID");
    }
    if (isNaN(storeId) || storeId <= 0) {
      throw new Error("STOREID_MUST_BE_POSITIVE_NUMBER");
    }
    return storeRepo.getAllStoreBooks(storeId);
  }
}
