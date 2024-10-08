<template>
  <main>
    <div class="header-main">
      <h2>Manager Product</h2>
      <div class="flex gap-2">
        <input type="text" placeholder="Tìm kiếm" v-model="searchItem" />
        <button class="btn-add" @click="handleShowForm">Add New Product</button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>STT</th>
          <th>Image</th>
          <th>Name</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in filterProduct" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td><img :src="product.image" alt="Orange" /></td>
          <td>{{ product.nameProduct }}</td>
          <td>{{ product.price }} đ</td>
          <td>{{ product.quantity }}</td>
          <td>
            <button class="btn-edit" @click="handleShowEdit(product)">
              Edit
            </button>
            <button class="btn-delete" @click="handleConfirmDelete(product.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <FormAdd
      :showForm="showForm"
      @close="closeForm"
      @addProduct="addProduct"
    ></FormAdd>
    <br />
    <FormEdit
      :showFormEdit="showFormEdit"
      :productEdit="productEdit"
      @closeEdit="closeEdit"
    />

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Xác nhận xóa thông tin</h3>
        <p>Bạn có chắc chắn muốn xóa thông tin sản phẩm này?</p>
        <div class="flex justify-end gap-2 mt-4">
          <button
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
            @click="handleCloseDeleteModal"
          >
            Hủy
          </button>
          <button
            class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
            @click="handleDelete"
          >
            Xóa
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { computed, reactive, ref } from "vue";
import FormAdd from "./FormAdd.vue";
import FormEdit from "./FormEdit.vue";

const showForm = ref(false);
const showFormEdit = ref(false);
const showDeleteModal = ref(false);
const selectProduct = ref(null);
const searchItem = ref("");
const productEdit = ref(null);
let products = reactive(JSON.parse(localStorage.getItem("listProduct")) || []);

const handleShowForm = () => {
  showForm.value = true;
};

const closeForm = () => {
  showForm.value = false;
};

const addProduct = (newProduct) => {
  products.push(newProduct);
  localStorage.setItem("listProduct", JSON.stringify(products));
};

const handleShowEdit = (product) => {
  productEdit.value = product;
  showFormEdit.value = true;
};

const closeEdit = () => {
  showFormEdit.value = false;
};

const handleConfirmDelete = (id) => {
  selectProduct.value = id;
  showDeleteModal.value = true;
};

const handleCloseDeleteModal = () => {
  showDeleteModal.value = false;
};

const handleDelete = () => {
  const index = products.findIndex(
    (product) => product.id === selectProduct.value
  );
  if (index !== -1) {
    products.splice(index, 1); // Xóa sản phẩm bằng splice
    localStorage.setItem("listProduct", JSON.stringify(products));
  }
  showDeleteModal.value = false;
};

// Hàm tìm kiếm sản phẩm
const filterProduct = computed(() => {
  if (searchItem.value) {
    return products.filter((product) =>
      product.nameProduct.toLowerCase().includes(searchItem.value.toLowerCase())
    );
  }
  // Nếu không tìm kiếm, trả về toàn bộ sản phẩm
  return products;
});
</script>
<style>
/* General Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
}

header {
  background-color: #d3d7df;
  padding: 15px;
  text-align: center;
}

.container {
  display: flex;
}

.sidebar {
  width: 200px;
  background-color: #222;
  padding-top: 20px;
  min-height: 100vh;
}

.sidebar ul {
  list-style-type: none;
}

.sidebar ul li {
  margin-bottom: 10px;
}

.sidebar ul li a {
  color: #fff;
  text-decoration: none;
  padding: 10px;
  display: block;
}

.active {
  background-color: #444;
}

main {
  flex-grow: 1;
  padding: 20px;
}

.header-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.btn-add {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

table thead {
  background-color: #f1f1f1;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
}

table img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.btn-edit {
  background-color: #f0ad4e;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-delete {
  background-color: #d9534f;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 5px;
}

/* Responsive design */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}
</style>
