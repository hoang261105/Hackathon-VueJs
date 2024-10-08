<template>
  <div
    v-if="props.showForm"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 class="text-xl font-semibold mb-4">Thêm thông sản phẩm</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Tên sản phẩm</label>
          <input
            type="text"
            v-model="inputValue.nameProduct"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.nameProduct }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Hình ảnh</label>
          <input
            type="text"
            v-model="inputValue.image"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.image }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Giá</label>
          <input
            type="number"
            min="10000"
            v-model="inputValue.price"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.price }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Số lượng</label>
          <input
            type="number"
            min="1"
            max="100"
            v-model="inputValue.quantity"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.quantity }}</p>
        </div>
        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
            @click="handleCloseForm"
          >
            Đóng
          </button>

          <button
            type="submit"
            class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Lưu thông tin
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";

const props = defineProps(["showForm"]);
const emit = defineEmits(["close", "addProduct"]);
const products = reactive(
  JSON.parse(localStorage.getItem("listProduct")) || []
);
const handleCloseForm = () => {
  emit("close");
};

const reset = () => {
  inputValue.nameProduct = "";
  (inputValue.price = 10000), (inputValue.quantity = 1);
  inputValue.image = "";
};

const inputValue = reactive({
  nameProduct: "",
  image: "",
  price: 10000,
  quantity: 1,
});

const error = reactive({
  nameProduct: "",
  image: "",
  price: "",
  quantity: "",
});

const handleSubmit = () => {
  const existProduct = products.find(
    (product) => product.nameProduct === inputValue.nameProduct
  );
  if (!inputValue.nameProduct) {
    error.nameProduct = "Vui lòng nhập tên sản phẩm";
  } else if (existProduct) {
    error.nameProduct = "Tên sản phẩm đã tồn tại";
  } else {
    error.nameProduct = "";
  }

  if (!inputValue.image) {
    error.image = "Vui lòng nhập ảnh sản phẩm";
  } else {
    error.image = "";
  }

  if (!inputValue.price) {
    error.price = "Vui lòng nhập giá sản phẩm";
  } else {
    error.price = "";
  }

  if (!inputValue.quantity) {
    error.quantity = "Vui lòng nhập số lượng sản phẩm";
  } else {
    error.quantity = "";
  }

  if (!error.nameProduct && !error.image && !error.price && !error.quantity) {
    const newProduct = {
      id: Math.ceil(Math.random() * 10000),
      nameProduct: inputValue.nameProduct,
      image: inputValue.image,
      price: inputValue.price,
      quantity: inputValue.quantity,
    };
    emit("addProduct", newProduct);
    emit("close");
    reset();
  }
};
</script>
<style lang=""></style>
