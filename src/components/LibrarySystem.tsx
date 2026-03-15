import React, { useState } from 'react';
import { Plus, Search, Trash2, Book, X, Hash, User, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookData {
  id: number;
  title: string;
  author: string;
  quantity: number;
}

export const LibrarySystem = ({ onClose }: { onClose: () => void }) => {
  const [library, setLibrary] = useState<BookData[]>([]);
  const [view, setView] = useState<'menu' | 'add' | 'display' | 'search' | 'delete'>('menu');
  
  // Form states
  const [newBook, setNewBook] = useState({ id: '', title: '', author: '', quantity: '' });
  const [searchId, setSearchId] = useState('');
  const [deleteId, setDeleteId] = useState('');
  const [message, setMessage] = useState('');

  const addBook = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(newBook.id);
    if (library.some(b => b.id === id)) {
      setMessage('Error: Book ID already exists!');
      return;
    }
    const book: BookData = {
      id,
      title: newBook.title,
      author: newBook.author,
      quantity: parseInt(newBook.quantity)
    };
    setLibrary([...library, book]);
    setMessage('Book Added Successfully!');
    setNewBook({ id: '', title: '', author: '', quantity: '' });
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteBook = (e: React.FormEvent) => {
    e.preventDefault();
    const id = parseInt(deleteId);
    if (!library.some(b => b.id === id)) {
      setMessage('Error: Book not found.');
      return;
    }
    setLibrary(library.filter(b => b.id !== id));
    setMessage('Book Deleted Successfully!');
    setDeleteId('');
    setTimeout(() => setMessage(''), 3000);
  };

  const searchResult = library.find(b => b.id === parseInt(searchId));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-emerald-500 text-white">
          <div className="flex items-center space-x-3">
            <Book size={24} />
            <h3 className="text-xl font-display font-bold">Library Management System</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {message && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl text-center font-bold ${message.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'}`}
            >
              {message}
            </motion.div>
          )}

          {view === 'menu' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <MenuButton icon={<Plus />} label="Add Book" onClick={() => setView('add')} color="bg-emerald-500" />
              <MenuButton icon={<Book />} label="Display Books" onClick={() => setView('display')} color="bg-blue-500" />
              <MenuButton icon={<Search />} label="Search Book" onClick={() => setView('search')} color="bg-amber-500" />
              <MenuButton icon={<Trash2 />} label="Delete Book" onClick={() => setView('delete')} color="bg-red-500" />
            </div>
          )}

          {view === 'add' && (
            <form onSubmit={addBook} className="space-y-4">
              <Input icon={<Hash />} label="Book ID" type="number" value={newBook.id} onChange={v => setNewBook({...newBook, id: v})} required />
              <Input icon={<Book />} label="Title" type="text" value={newBook.title} onChange={v => setNewBook({...newBook, title: v})} required />
              <Input icon={<User />} label="Author" type="text" value={newBook.author} onChange={v => setNewBook({...newBook, author: v})} required />
              <Input icon={<Package />} label="Quantity" type="number" value={newBook.quantity} onChange={v => setNewBook({...newBook, quantity: v})} required />
              <div className="flex space-x-3 pt-4">
                <button type="submit" className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-colors">Add Book</button>
                <button type="button" onClick={() => setView('menu')} className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 font-bold rounded-xl">Back</button>
              </div>
            </form>
          )}

          {view === 'display' && (
            <div className="space-y-4">
              {library.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">No books in library.</div>
              ) : (
                <div className="space-y-3">
                  {library.map(book => (
                    <div key={book.id} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-lg">{book.title}</h4>
                          <p className="text-sm text-zinc-500">by {book.author}</p>
                        </div>
                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded">ID: {book.id}</span>
                      </div>
                      <div className="mt-2 text-sm font-medium">Quantity: {book.quantity}</div>
                    </div>
                  ))}
                </div>
              )}
              <button onClick={() => setView('menu')} className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 font-bold rounded-xl mt-4">Back to Menu</button>
            </div>
          )}

          {view === 'search' && (
            <div className="space-y-6">
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  placeholder="Enter Book ID to search..." 
                  className="flex-1 px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-amber-500"
                  value={searchId}
                  onChange={e => setSearchId(e.target.value)}
                />
              </div>
              
              {searchId && (
                <div className="p-6 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
                  {searchResult ? (
                    <div className="space-y-2">
                      <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wider">Book Found!</div>
                      <h4 className="text-xl font-bold">{searchResult.title}</h4>
                      <p className="text-zinc-500">Author: {searchResult.author}</p>
                      <p className="font-medium">Quantity: {searchResult.quantity}</p>
                    </div>
                  ) : (
                    <div className="text-center text-zinc-500">Book not found.</div>
                  )}
                </div>
              )}
              <button onClick={() => setView('menu')} className="w-full py-3 bg-zinc-100 dark:bg-zinc-800 font-bold rounded-xl">Back to Menu</button>
            </div>
          )}

          {view === 'delete' && (
            <form onSubmit={deleteBook} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 ml-1">Enter Book ID to delete</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 101" 
                  className="w-full px-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-red-500"
                  value={deleteId}
                  onChange={e => setDeleteId(e.target.value)}
                />
              </div>
              <div className="flex space-x-3">
                <button type="submit" className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-colors">Delete Book</button>
                <button type="button" onClick={() => setView('menu')} className="px-6 py-3 bg-zinc-100 dark:bg-zinc-800 font-bold rounded-xl">Back</button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const MenuButton = ({ icon, label, onClick, color }: { icon: React.ReactNode, label: string, onClick: () => void, color: string }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 hover:scale-[1.02] transition-all group border border-zinc-100 dark:border-zinc-800"
  >
    <div className={`p-4 ${color} text-white rounded-2xl mb-4 shadow-lg group-hover:rotate-12 transition-transform`}>
      {icon}
    </div>
    <span className="font-bold text-zinc-700 dark:text-zinc-300">{label}</span>
  </button>
);

const Input = ({ icon, label, type, value, onChange, required }: { icon: React.ReactNode, label: string, type: string, value: string, onChange: (v: string) => void, required?: boolean }) => (
  <div className="space-y-2">
    <label className="text-sm font-bold text-zinc-500 ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </div>
      <input 
        type={type}
        required={required}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
        placeholder={`Enter ${label.toLowerCase()}...`}
      />
    </div>
  </div>
);
