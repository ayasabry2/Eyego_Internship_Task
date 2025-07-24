'use client';

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters, setSort, setPage, setItems, RootState } from '../lib/store';

export default function DataTable() {
  const dispatch = useDispatch();
  const { items, filters, sort, currentPage, itemsPerPage } = useSelector((state: RootState) => state.data);
  const [localItems, setLocalItems] = useState(items);
  const [editId, setEditId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({ title: '', price: '', image: '', category: '' });
  const [newForm, setNewForm] = useState({ title: '', price: '', image: '', category: '' });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [sampleImages, setSampleImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      const formattedItems = data.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
      }));
      setLocalItems(formattedItems);
      dispatch(setItems(formattedItems));

  
      const images = data.map((product: any) => product.image);
      setSampleImages([...new Set(images)].slice(0, 5)); 
    };
    fetchData();
  }, [dispatch]);

  const filteredItems = localItems
    .filter(
      (item) =>
        item.title.toLowerCase().includes(filters.title.toLowerCase()) &&
        item.category.toLowerCase().includes(filters.category.toLowerCase())
    )
    .sort((a, b) => {
      const field = sort.field as keyof typeof a;
      const order = sort.order === 'asc' ? 1 : -1;
      return a[field] > b[field] ? order : -order;
    });

  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handleSort = (field: string) => {
    dispatch(setSort({ field, order: sort.field === field && sort.order === 'asc' ? 'desc' : 'asc' }));
  };

  const handleEdit = (item: any) => {
    setEditId(item.id);
    setEditForm({ title: item.title, price: item.price.toString(), image: item.image, category: item.category });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      const response = await fetch(`https://fakestoreapi.com/products/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editForm.title,
          price: parseFloat(editForm.price),
          image: editForm.image,
          category: editForm.category,
        }),
      });
      if (response.ok) {
        const updatedItem = await response.json();
        setLocalItems(localItems.map((item) => item.id === editId ? updatedItem : item));
        dispatch(setItems(localItems.map((item) => item.id === editId ? updatedItem : item)));
        setIsEditModalOpen(false);
        setEditId(null);
        setEditForm({ title: '', price: '', image: '', category: '' });
      }
    }
  };

  const handleDelete = async (id: number) => {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setLocalItems(localItems.filter((item) => item.id !== id));
      dispatch(setItems(localItems.filter((item) => item.id !== id)));
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('https://fakestoreapi.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newForm.title,
        price: parseFloat(newForm.price),
        image: newForm.image,
        category: newForm.category,
      }),
    });
    if (response.ok) {
      const newItem = await response.json();
      setLocalItems([...localItems, newItem]);
      dispatch(setItems([...localItems, newItem]));
      setIsAddModalOpen(false);
      setNewForm({ title: '', price: '', image: '', category: '' });
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-2 bg-blue-900 text-white rounded hover:bg-blue-800"
        >
          Add Product
        </button>
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Filter by title"
          onChange={(e) => dispatch(setFilters({ ...filters, title: e.target.value }))}
          className="p-2 border rounded w-full sm:w-1/2"
        />
        <input
          type="text"
          placeholder="Filter by category"
          onChange={(e) => dispatch(setFilters({ ...filters, category: e.target.value }))}
          className="p-2 border rounded w-full sm:w-1/2"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              {['title', 'price', 'image', 'category'].map((field) => (
                <th
                  key={field}
                  className="p-2 border cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSort(field)}
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {sort.field === field && (sort.order === 'asc' ? ' ↑' : ' ↓')}
                </th>
              ))}
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="p-2">{item.title}</td>
                <td className="p-2">${item.price.toFixed(2)}</td>
                <td className="p-2">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                </td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 bg-yellow-500 text-white rounded mr-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 bg-red-700 text-white rounded"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={newForm.title}
                onChange={(e) => setNewForm({ ...newForm, title: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={newForm.price}
                onChange={(e) => setNewForm({ ...newForm, price: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <select
                value={newForm.image}
                onChange={(e) => setNewForm({ ...newForm, image: e.target.value })}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select an Image</option>
                {sampleImages.map((img, index) => (
                  <option key={index} value={img}>{img.split('/').pop()}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Category"
                value={newForm.category}
                onChange={(e) => setNewForm({ ...newForm, category: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Add
                </button>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Edit Product</h3>
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editForm.title}
                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                placeholder="Price"
                value={editForm.price}
                onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <select
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="p-2 border rounded w-full"
                required
              >
                <option value="">Select an Image</option>
                {sampleImages.map((img, index) => (
                  <option key={index} value={img}>{img.split('/').pop()}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Category"
                value={editForm.category}
                onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                className="p-2 border rounded w-full"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => { setIsEditModalOpen(false); setEditId(null); }}
                  className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={() => dispatch(setPage(currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2 bg-blue-900 text-white rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => dispatch(setPage(currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2 bg-blue-900 text-white rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
}