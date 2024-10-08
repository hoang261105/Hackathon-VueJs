<template>
  <div
    v-if="props.showFormEdit"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h3 class="text-xl font-semibold mb-4">Sửa thông tin sản phẩm</h3>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Tên sản phẩm</label>
          <input
            type="text"
            v-model="props.productEdit.nameProduct"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.nameProduct }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Hình ảnh</label>
          <input
            type="text"
            v-model="props.productEdit.image"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p class="text-red-500">{{ error.image }}</p>
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2">Giá</label>
          <input
            type="number"
            min="10000"
            v-model="props.productEdit.price"
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
            v-model="props.productEdit.quantity"
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
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
const props = defineProps(["showFormEdit", "productEdit"]);
const emit = defineEmits(["closeEdit"]);
const products = reactive(
  JSON.parse(localStorage.getItem("listProduct")) || []
);

const error = reactive({
  nameProduct: "",
  image: "",
  price: "",
  quantity: "",
});

const handleCloseForm = () => {
  emit("closeEdit");
};

const handleSubmit = () => {
  error.nameProduct = error.image = error.price = error.quantity = "";

  let isValid = true;

  if (!props.productEdit.nameProduct) {
    error.nameProduct = "Vui lòng nhập tên sản phẩm";
    isValid = false;
  } else {
    const existingProduct = products.find(
      (product) =>
        product.nameProduct === props.productEdit.nameProduct &&
        product.id !== props.productEdit.id
    );
    if (existingProduct) {
      error.nameProduct = "Tên sản phẩm đã tồn tại";
      isValid = false;
    }
  }

  if (!props.productEdit.image) {
    error.image = "Vui lòng nhập ảnh sản phẩm";
    isValid = false;
  }

  if (!props.productEdit.price || props.productEdit.price < 10000) {
    error.price = "Giá sản phẩm phải lớn hơn 10,000";
    isValid = false;
  }

  if (!props.productEdit.quantity || props.productEdit.quantity < 1) {
    error.quantity = "Số lượng phải từ 1 đến 100";
    isValid = false;
  }

  if (isValid) {
    const productIndex = products.findIndex(
      (product) => product.id === props.productEdit.id
    );
    if (productIndex !== -1) {
      products[productIndex] = { ...props.productEdit };
      localStorage.setItem("listProduct", JSON.stringify(products));
      emit("closeEdit");
    }
  }
};
</script>
<style></style>
