import React, { useState, useMemo } from "react";
import "./App.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([
    { name: "Cá", price: 3, category: "Thực phẩm" },
    { name: "Bút", price: 5, category: "Văn phòng phẩm" },
  ]);
  const [newItem, setNewItem] = useState({ name: "", price: 0, category: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ["Thực phẩm", "Văn phòng phẩm", "Khác"];

  const handleAddOrEditItem = () => {
    if (newItem.name && newItem.price && newItem.category) {
      if (editingIndex !== null) {
        const updatedItems = [...items];
        updatedItems[editingIndex] = newItem;
        setItems(updatedItems);
        setEditingIndex(null);
      } else {
        setItems([...items, newItem]);
      }
      setNewItem({ name: "", price: 0, category: "" });
      setIsModalOpen(false);
    }
  };

  const handleEditItem = (index) => {
    setEditingIndex(index);
    setNewItem(items[index]);
    setIsModalOpen(true);
  };

  const handleDeleteItem = (index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const totalPrice = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="main-content">
          <h1>Bảng Thông Tin</h1>
          <button
            className="btn medium primary"
            onClick={() => {
              setNewItem({ name: "", price: 0, category: "" });
              setEditingIndex(null);
              setIsModalOpen(true);
            }}
          >
            Thêm Hàng Hóa
          </button>

          <div className="table-container">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <table className="table">
              <thead>
                <tr>
                  <th>Tên</th>
                  <th>Giá</th>
                  <th>Danh mục</th>
                  <th style={{ width: "130px" }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {items
                  .filter((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.price}</td>
                      <td>{item.category}</td>
                      <td>
                        <button
                          className="btn primary small"
                          onClick={() => handleEditItem(index)}
                        >
                          Chỉnh sửa
                        </button>
                        <button
                          className="btn danger small"
                          onClick={() => handleDeleteItem(index)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="total-container">
              <strong>Tổng số:</strong> {totalPrice} {/* Static total */}
            </div>
          </div>

          {isModalOpen && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h2>{editingIndex !== null ? "Chỉnh Sửa Hàng Hóa" : "Thêm Hàng Hóa"}</h2>
                  <button
                    className="modal-close"
                    onClick={() => setIsModalOpen(false)}
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <input
                    type="text"
                    placeholder="Tên hàng hóa"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Giá hàng hóa"
                    value={newItem.price || ""}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
                        price: parseFloat(e.target.value) || 0,
                      })
                    }
                  />
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="modal-footer">
                  <button className="btn primary" onClick={handleAddOrEditItem}>
                    {editingIndex !== null ? "Lưu thay đổi" : "Thêm hàng hóa"}
                  </button>
                  <button
                    className="btn secondary"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
