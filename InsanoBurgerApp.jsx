import React, { useState, useContext, createContext } from 'react';

// --- DADOS DO CARDÁPIO ---
const additionalsData = [
  { name: 'Bacon', price: 3.00 },
  { name: 'Calabresa', price: 2.50 },
  { name: 'Camarão', price: 2.00 },
  { name: 'Carne de Sol', price: 6.00 },
  { name: 'Cebola', price: 0.50 },
  { name: 'Cebola Roxa', price: 0.50 },
  { name: 'Cebola Caramelizada', price: 2.00 }, // <-- SUA MUDANÇA
  { name: 'Cheddar', price: 2.50 },
  { name: 'Cream Cheese', price: 4.00 },
  { name: 'Geleia de Pimenta', price: 2.00 },
  { name: 'Hamburguer Frango', price: 4.50 },
  { name: 'Hamburguer Carne', price: 4.50 },
  { name: 'Onion Rings', price: 3.00 },
  { name: 'Ovo', price: 1.50 },
  { name: 'Piccles', price: 1.00 },
  { name: 'Pão Bola', price: 1.00 },
  { name: 'Pão Brioche', price: 3.00 },
  { name: 'Pão Árabe', price: 3.00 },
  { name: 'Queijo Coalho', price: 2.50 },
  { name: 'Tomate', price: 0.50 }
];

const menuData = {
  burgers: [
    { id: 'b1', name: 'Arroxado', price: 10.00, ingredients: ['Pão', 'Blend 100g Bovino', 'Queijo Coalho', 'Tomate', 'Molho Especial'] },
    { id: 'b2', name: 'Alienado', price: 11.00, ingredients: ['Pão', 'Blend 100g Bovino', 'Bacon', 'Cheddar', 'Molho Especial'] },
    { id: 'b3', name: 'Esquentado', price: 13.00, ingredients: ['Pão Brioche', 'Blend 100g Bovino', 'Geleia de Pimenta', 'Calabresa', 'Queijo Coalho', 'Cebola Roxa', 'Molho Especial'] },
    { id: 'b4', name: 'Diferenciado', price: 14.00, ingredients: ['Pão Brioche', 'Frango c/ Bacon Empanado', 'Bacon', 'Cream Cheese', 'Tomate', 'Molho Especial'] },
    { id: 'b5', name: 'Alucinado', price: 16.00, ingredients: ['Pão Brioche', 'Blend 100g Bovino', 'Bacon', 'Cheddar', 'Cream Cheese', 'Piccles', 'Molho Especial'] },
    { id: 'b6', name: 'Exagerado', price: 19.00, ingredients: ['Pão Brioche', 'Blend 100g Bovino', 'Ovo', 'Bacon', 'Calabresa', 'Queijo Coalho', 'Tomate', 'Molho Especial'] },
    { id: 'b7', name: 'Insano', price: 22.00, ingredients: ['Pão Brioche', '2x Blend 100g Bovino', '2x Bacon', '2x Queijo Coalho', 'Molho Especial'] },
    { id: 'b8', name: 'Desvairado', price: 18.00, ingredients: ['Pão Brioche', 'Carne de Sol 100g', 'Cream Cheese', 'Bacon', 'Molho Especial'] },
    { id: 'b9', name: 'Frenético (Especial)', price: 16.00, ingredients: ['Pão Brioche', 'Blend 100g Bovino', 'Onion Rings', 'Molho de Cheddar', 'Bacon', 'Molho Especial'] },
    { id: 'b10', name: 'Intenso (Especial)', price: 18.00, ingredients: ['Pão Brioche', 'Burguer de Linguiça recheado', 'Cheddar Original', 'Cebola Caramelizada', 'Bacon', 'Molho Especial'] },
    { id: 'b11', name: 'Biruta (Especial)', price: 18.00, ingredients: ['Pão Brioche', 'Tiras de Frango Empanado', 'Geleia de Pimenta', 'Bacon', 'Onion Rings', 'Piccles', 'Molho Especial'] },
    { id: 'b12', name: 'Pancada (Especial)', price: 20.00, ingredients: ['Pão Brioche', 'Blend 100g Bovino', 'Camarão Empanado', 'Cream Cheese', 'Molho Especial'] },
  ],
  // --- NOVA CATEGORIA: Monte seu Hambúrguer ---
  buildYourOwn: [
    { id: 'byo1', name: 'Pão Bola', price: 1.00 },
    { id: 'byo2', name: 'Pão Brioche', price: 3.00 },
    { id: 'byo3', name: 'Pão Árabe', price: 3.00 },
    { id: 'byo4', name: 'Hamburguer Carne', price: 4.50 },
    { id: 'byo5', name: 'Hamburguer Frango', price: 4.50 },
    { id: 'byo6', name: 'Carne de Sol', price: 6.00 },
    { id: 'byo7', name: 'Bacon', price: 3.00 },
    { id: 'byo8', name: 'Calabresa', price: 2.50 },
    { id: 'byo9', name: 'Camarão', price: 2.00 },
    { id: 'byo10', name: 'Ovo', price: 1.50 },
    { id: 'byo11', name: 'Queijo Coalho', price: 2.50 },
    { id: 'byo12', name: 'Cheddar', price: 2.50 },
    { id: 'byo13', name: 'Cream Cheese', price: 4.00 },
    { id: 'byo14', name: 'ONION RINGS', price: 3.00 },
    { id: 'byo15', name: 'Geleia de Pimenta', price: 2.00 },
    { id: 'byo16', name: 'Piccles', price: 1.00 },
    { id: 'byo17', name: 'Tomate', price: 0.50 },
    { id: 'byo18', name: 'Cebola', price: 0.50 },
    { id: 'byo19', name: 'Cebola Roxa', price: 0.50 },
    { id: 'byo20', name: 'Cebola Caramelizada', price: 2.00 },
  ],
  // --- FIM DA NOVA CATEGORIA ---
  sides: [
    { id: 's1', name: 'Batata Frita 300g', price: 12.00 },
    { id: 's2', name: 'Batata Especial 500g (Cheddar e Bacon)', price: 20.00 },
  ],
  juices: [
    { id: 'j1', name: 'Suco Abacaxi', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
    { id: 'j2', name: 'Suco Maracujá', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
    { id: 'j3', name: 'Suco Goiaba', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
    { id: 'j4', name: 'Suco Morango', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
    { id: 'j5', name: 'Suco Graviola', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
    { id: 'j6', name: 'Suco Acerola', price: 5.00, options: ['Com Açúcar', 'Sem Açúcar'] },
  ],
  sodas: [
    { id: 'd7', name: 'Água', price: 3.00 },
    { id: 'd8', name: 'Água c/ Gás', price: 4.00 },
    { id: 'd9', name: 'Pitchulinha', price: 3.00, options: ['Guaraná', 'Pepsi', 'Volguinha'] },
    { id: 'd10', name: 'Latinha', price: 5.00, options: ['Coca', 'Coca Zero', 'Guaraná', 'Guaraná Zero', 'Pepsi', 'Pepsi Zero', 'São Geraldo'] },
    { id: 'd11_p', name: 'Pepsi 1L', price: 8.00 },
    { id: 'd11_g', name: 'Guaraná 1L', price: 8.00 },
    // { id: 'd12', name: 'Coca de Vidro 1L', price: 10.00 }, // <-- SUA MUDANÇA (REMOVIDO)
  ]
};

// --- FIM DOS DADOS ---

// --- 1. CRIAÇÃO DO CONTEXTO DO CARRINHO ---

const CartContext = createContext();

// Hook customizado para facilitar o uso do contexto
const useCart = () => useContext(CartContext);

// Provider que irá gerenciar todo o estado e lógica do carrinho
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [addedItemName, setAddedItemName] = useState('');

  // Gatilho do popup de item adicionado
  const showAddedItemPopup = (name) => {
    setAddedItemName(name);
    setTimeout(() => setAddedItemName(''), 1500); // Esconde depois de 1.5s
  };

  // Adiciona itens agrupados (refris/batatas) ou incrementa a quantidade
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => !cartItem.cartItemId && cartItem.id === item.id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          (cartItem.id === item.id && !cartItem.cartItemId)
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    showAddedItemPopup(item.name);
  };

  // Adiciona um item único (hambúrguer ou suco já personalizado)
  const addUniqueItemToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
    showAddedItemPopup(item.name);
  };

  // Remove um item único (hambúrguer ou suco) do carrinho
  const handleRemoveItem = (cartItemId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  // Incrementa item agrupado no carrinho
  const handleIncrementItem = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        (item.id === id && !item.cartItemId) ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  // Decrementa item agrupado ou remove do carrinho
  const handleDecrementItem = (id) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => !item.cartItemId && item.id === id
      );
      if (existingItem && existingItem.qty === 1) {
        return prevCart.filter((item) => item.id !== id || item.cartItemId);
      }
      return prevCart.map((item) =>
        (item.id === id && !item.cartItemId) ? { ...item, qty: item.qty - 1 } : item
      );
    });
  };

  // Calcula o total do pedido
  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (item.cartItemId) {
        return total + (item.finalPrice || item.price);
      }
      return total + item.price * (item.qty || 1);
    }, 0);
  };
  
  // Limpa o carrinho
  const clearCart = () => {
    setCart([]);
  };

  // Valor que será "provido" para todos os componentes filhos
  const value = {
    cart,
    addedItemName,
    handleAddToCart,
    addUniqueItemToCart,
    handleRemoveItem,
    handleIncrementItem,
    handleDecrementItem,
    calculateTotal,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// --- 2. COMPONENTES DE UI (AGORA INDEPENDENTES) ---

// Componente para um item do cardápio
// Agora usa o hook useCart() e não precisa mais da prop onAddToCart
function MenuItem({ item, onAddBurger, onAddOptionItem }) {
  // Pega a função de adicionar ao carrinho diretamente do contexto
  const { handleAddToCart } = useCart();

  // --- CORREÇÃO AQUI ---
  // Um item só é um "hambúrguer personalizável" se começar com 'b' E tiver a lista 'ingredients'
  const isBurger = item.id.startsWith('b') && item.ingredients;
  const hasOptions = !!item.options; // Verifica se o item tem um array de opções

  const handleAddClick = () => {
    if (isBurger) {
      onAddBurger(item); // Abre modal (controlado pelo App)
    } else if (hasOptions) {
      onAddOptionItem(item); // Abre modal de opções (controlado pelo App)
    } else {
      handleAddToCart(item); // Adiciona direto usando o contexto
    }
  };

  return (
    <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg shadow-sm">
      <div className="flex-1 pr-2">
        <h3 className="font-semibold text-white font-bebas tracking-wide text-lg">{item.name}</h3>
        {item.ingredients && (
          <p className="text-xs text-gray-400 mt-1 break-words">
            {item.ingredients.join(', ')}
          </p>
        )}
        <p className="text-sm text-yellow-500 font-bold mt-1">
          R$ {item.price.toFixed(2).replace('.', ',')}
        </p>
      </div>
      <button
        onClick={handleAddClick}
        className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Adicionar
      </button>
    </div>
  );
}

// Componente para um item no carrinho
// Agora usa o hook useCart() e não precisa mais das props onIncrement, onDecrement, onRemoveItem
function CartItem({ item }) {
  // Pega as funções de manipulação do carrinho diretamente do contexto
  const { handleIncrementItem, handleDecrementItem, handleRemoveItem } = useCart();

  // Item único (Hambúrguer ou Suco)
  if (item.cartItemId) {
    return (
      <div className="p-2 border-b border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium text-gray-200">{item.name}</p>
            <p className="text-sm text-yellow-500 font-bold">
              R$ {(item.finalPrice || item.price).toFixed(2).replace('.', ',')}
            </p>
          </div>
          <button
            onClick={() => handleRemoveItem(item.cartItemId)}
            className="px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-300"
          >
            Remover
          </button>
        </div>
        {item.removed && item.removed.length > 0 && (
          <p className="mt-1 text-xs text-red-400 italic">
            Sem: {item.removed.join(', ')}
          </p>
        )}
        {item.added && item.added.length > 0 && (
          <p className="mt-1 text-xs text-green-400 italic">
            Com: {item.added.map(a => a.name).join(', ')}
          </p>
        )}
        {item.optionChoice && (
          <p className="mt-1 text-xs text-blue-400 italic">
            Opção: {item.optionChoice}
          </p>
        )}
      </div>
    );
  }

  // Item agrupado (bebida/batata - tem qty)
  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-700">
      <div>
        <p className="font-medium text-gray-200">{item.name}</p>
        <p className="text-sm text-yellow-500 font-bold">
          R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleDecrementItem(item.id)}
          className="px-2 py-0.5 text-lg font-bold text-white bg-red-500 rounded-md hover:bg-red-600"
        >
          -
        </button>
        <span className="w-6 text-center text-white">{item.qty}</span>
        <button
          onClick={() => handleIncrementItem(item.id)}
          className="px-2 py-0.5 text-lg font-bold text-white bg-green-500 rounded-md hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

// --- 3. COMPONENTE PRINCIPAL (AGORA MAIS LIMPO) ---

// O App gerencia apenas os modais e o formulário.
// O Carrinho é gerenciado pelo CartContext.
function App() {
  // Pega o estado e funções do carrinho a partir do contexto
  const {
    cart,
    addedItemName,
    addUniqueItemToCart,
    calculateTotal,
    clearCart
  } = useCart();

  // --- Estado do Formulário ---
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'dinheiro',
    changeFor: '', // <-- NOVO CAMPO PARA O TROCO
  });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // --- Estados para o Modal de Hambúrguer ---
  const [observingItem, setObservingItem] = useState(null);
  const [removedIngredients, setRemovedIngredients] = useState([]);
  const [addedIngredients, setAddedIngredients] = useState([]);

  // --- Estados para o Modal de Opções (Suco, Pitchulinha, Latinha) ---
  const [observingItemWithOptions, setObservingItemWithOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState('');

  // --- FUNÇÕES DE LÓGICA (só as que o App precisa) ---

  // Adiciona um hambúrguer (agora chama o contexto)
  const handleAddBurger = () => {
    if (!observingItem) return;

    const extrasPrice = addedIngredients.reduce((sum, item) => sum + item.price, 0);
    const finalPrice = observingItem.price + extrasPrice;

    const newBurgerItem = {
      ...observingItem,
      cartItemId: crypto.randomUUID(), // <-- MELHORIA: ID 100% Único
      removed: removedIngredients,
      added: addedIngredients,
      finalPrice: finalPrice,
    };

    // Chama a função do contexto para adicionar o item
    addUniqueItemToCart(newBurgerItem);

    // Limpa e fecha o modal
    setObservingItem(null);
    setRemovedIngredients([]);
    setAddedIngredients([]);
  };

  // Adiciona um item com opções (suco, latinha, etc)
  const handleAddOptionItem = () => {
    if (!observingItemWithOptions) return;

    const newItem = {
      ...observingItemWithOptions,
      cartItemId: crypto.randomUUID(), // <-- MELHORIA: ID 100% Único
      optionChoice: selectedOption, // Armazena a opção escolhida (ex: 'Sem Açúcar' or 'Pepsi')
    };

    // Chama a função do contexto
    addUniqueItemToCart(newItem);

    // Limpa e fecha o modal
    setObservingItemWithOptions(null);
    setSelectedOption('');
  };

  // --- Funções do Formulário (permanecem no App) ---
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = {
        ...prevData,
        [name]: value,
      };

      // Se mudou o pagamento e NÃO é dinheiro, limpa o troco.
      if (name === 'payment' && value !== 'dinheiro') {
        newData.changeFor = '';
      }
      
      return newData;
    });
  };
  
  // Função para formatar o pedido (pura, não mexe com estado)
  const formatOrderForWhatsApp = (cart, formData, total) => {
    let orderString = "*Novo Pedido - Insano Burguer*\n\n";
    orderString += `*Cliente:* ${formData.name}\n`;
    orderString += `*Telefone:* ${formData.phone}\n`;
    orderString += `*Endereço:* ${formData.address}\n`;
    orderString += `*Pagamento:* ${formData.payment}\n`;
    
    // --- Adicionar informação de troco ---
    if (formData.payment === 'dinheiro' && formData.changeFor) {
      orderString += `*Troco para:* ${formData.changeFor}\n`;
    }
    // --- Fim da adição ---

    orderString += "\n*--- Pedido ---*\n\n";

    // --- CORREÇÃO NOS FILTROS ---
    // Pega só os hambúrgueres personalizados (que têm finalPrice)
    const burgers = cart.filter(item => item.finalPrice !== undefined); 
    // Pega só os itens com opções (Sucos, Latinhas, etc)
    const optionItems = cart.filter(item => item.optionChoice); 
    
    // --- NOVOS FILTROS PARA SEPARAR ---
    // Pega itens do "Monte seu Hambúrguer" (começam com 'byo')
    const buildYourOwnItems = cart.filter(item => item.qty && item.id.startsWith('byo'));
    // Pega as Batatas (começam com 's')
    const sideItems = cart.filter(item => item.qty && item.id.startsWith('s'));
    // Pega Bebidas sem opção (começam com 'd' e não têm 'optionChoice')
    const otherDrinks = cart.filter(item => item.qty && item.id.startsWith('d') && !item.optionChoice);
    // --- FIM DOS NOVOS FILTROS ---


    if (burgers.length > 0) {
      orderString += "*Hambúrgueres:*\n";
      burgers.forEach(item => {
        // CORREÇÃO DO ERRO 'toFixed' AQUI
        const price = item.finalPrice !== undefined ? item.finalPrice : item.price;
        orderString += `1x *${item.name}* (R$ ${price.toFixed(2).replace('.', ',')})\n`;
        if (item.removed && item.removed.length > 0) {
          orderString += `  *OBS: (Sem: ${item.removed.join(', ')})* ⚠️\n`;
        }
        if (item.added && item.added.length > 0) {
          orderString += `  *EXTRA: (Com: ${item.added.map(a => a.name).join(', ')})* 💲\n`;
        }
        if ((!item.removed || item.removed.length === 0) && (!item.added || item.added.length === 0)) {
          orderString += `  (Padrão)\n`;
        }
      });
      orderString += "\n";
    }

    if (optionItems.length > 0) {
      orderString += "*Sucos e Bebidas com Opção:*\n"; // Nome atualizado
      optionItems.forEach(item => {
        orderString += `1x *${item.name}* (${item.optionChoice})\n`;
      });
      orderString += "\n";
    }

    // --- SEÇÕES NOVAS E SEPARADAS ---
    if (buildYourOwnItems.length > 0) {
      orderString += "*Monte seu Hambúrguer:*\n";
      buildYourOwnItems.forEach(item => {
        orderString += `${item.qty}x *${item.name}*\n`;
      });
      orderString += "\n";
    }

    if (sideItems.length > 0) {
      orderString += "*Batatas:*\n";
      sideItems.forEach(item => {
        orderString += `${item.qty}x *${item.name}*\n`;
      });
      orderString += "\n";
    }

    if (otherDrinks.length > 0) {
      orderString += "*Bebidas:*\n";
      otherDrinks.forEach(item => {
        orderString += `${item.qty}x *${item.name}*\n`;
      });
      orderString += "\n";
    }
    // --- FIM DAS SEÇÕES NOVAS ---

    orderString += `*TOTAL: R$ ${total.toFixed(2).replace('.', ',')}*`;
    return orderString;
  };

  // Envia o pedido
  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setFormError('');
    
    if (!formData.name || !formData.address || !formData.phone) {
      setFormError('Por favor, preencha Nome, Telefone e Endereço.');
      setTimeout(() => setFormError(''), 3000);
      return;
    }
    
    const yourWhatsAppNumber = '5588988137381'; // Substitua pelo seu número
    // Pega o total do contexto
    const total = calculateTotal();
    // Pega o carrinho do contexto
    const orderText = formatOrderForWhatsApp(cart, formData, total);
    const encodedText = encodeURIComponent(orderText);
    const whatsappUrl = `https://wa.me/${yourWhatsAppNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    // Limpa o carrinho usando a função do contexto
    clearCart();
    setFormData({ name: '', phone: '', address: '', payment: 'dinheiro', changeFor: '' }); // <-- Limpar aqui
    
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);
  };
  
  // --- Funções de controle dos Modais (permanecem no App) ---
    
  const handleToggleIngredient = (ingredientName) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredientName)
        ? prev.filter((item) => item !== ingredientName)
        : [...prev, ingredientName]
    );
  };

  const handleToggleAdditional = (additional) => {
    setAddedIngredients((prev) =>
      prev.some(item => item.name === additional.name)
        ? prev.filter((item) => item.name !== additional.name)
        : [...prev, additional]
    );
  };

  const handleOpenBurgerModal = (item) => {
    setObservingItem(item);
    setRemovedIngredients([]);
    setAddedIngredients([]);
  };

  // --- CORREÇÃO: Adicionando a função que estava faltando ---
  const handleCloseBurgerModal = () => {
    setObservingItem(null);
    setRemovedIngredients([]);
    setAddedIngredients([]);
  };

  const handleOpenOptionsModal = (item) => {
    setObservingItemWithOptions(item);
    setSelectedOption(item.options[0]); // Define a primeira opção como padrão
  };

  const handleCloseOptionsModal = () => {
    setObservingItemWithOptions(null);
  };

  // --- RENDERIZAÇÃO (JSX) ---
  return (
    <>
      {/* Estilos de Fonte (igual) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', sans-serif; }
        .font-roboto { font-family: 'Roboto', sans-serif; }
        
        /* Animação para o campo de troco */
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
      
      <div className="font-roboto bg-black min-h-screen text-white">
        {/* Cabeçalho (igual) */}
        <header className="bg-black shadow-md p-4 border-b-2 border-yellow-500">
          <div className="flex flex-col justify-center items-center space-y-4">
            <img 
              src="https://i.postimg.cc/1R2fzm3R/insano.png" 
              alt="Logo Insano Burguer 1" 
              className="h-28 rounded-lg"
            />
            {/* --- Segunda Imagem Reduzida --- */}
            <img 
              src="https://i.postimg.cc/mD6hCR37/burguer.png" 
              alt="Logo Insano Burguer 2" 
              className="h-24 rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/96/111827/FBBF24?text=Erro'; }}
            />
          </div>
        </header>

      {/* --- MODAL DE HAMBÚRGUER (igual) --- */}
      {observingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-yellow-500 max-h-[90vh] flex flex-col">
            <h3 className="text-xl font-semibold mb-4 text-white text-center">
              Personalizar: {observingItem.name}
            </h3>
            <div className="overflow-y-auto space-y-4 pr-2">
              {/* Remover */}
              <div className="border border-red-500 rounded-lg p-3">
                <label className="block text-lg font-bebas tracking-wider font-bold text-red-500 mb-2">
                  REMOVER INGREDIENTES ⚠️
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {observingItem.ingredients.map((ingredient) => (
                    <label key={ingredient} className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={removedIngredients.includes(ingredient)}
                        onChange={() => handleToggleIngredient(ingredient)}
                        className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-red-500 focus:ring-red-500"
                      />
                      <span className="text-white">{ingredient}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Adicionar */}
              <div className="border border-green-500 rounded-lg p-3">
                <label className="block text-lg font-bebas tracking-wider font-bold text-green-500 mb-2">
                  ADICIONAR EXTRAS 💲
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {additionalsData.map((additional) => (
                    <label key={additional.name} className="flex items-center justify-between p-2 rounded-md hover:bg-gray-800 cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={addedIngredients.some(item => item.name === additional.name)}
                          onChange={() => handleToggleAdditional(additional)}
                          className="h-5 w-5 rounded bg-gray-700 border-gray-600 text-green-500 focus:ring-green-500"
                        />
                        <span className="text-white">{additional.name}</span>
                      </div>
                      <span className="text-sm text-yellow-500 font-bold">
                        + R$ {additional.price.toFixed(2).replace('.', ',')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Botões do Modal */}
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-700">
              <button onClick={handleCloseBurgerModal} className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded-lg hover:bg-gray-500">
                Cancelar
              </button>
              <button onClick={handleAddBurger} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE OPÇÕES (Sucos/Bebidas) --- */}
      {observingItemWithOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40 p-4">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-sm border border-yellow-500">
            <h3 className="text-xl font-semibold mb-3 text-white">
              Opções: {observingItemWithOptions.name}
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {/* Gera os botões de rádio dinamicamente */}
              {observingItemWithOptions.options.map((option) => (
                <label key={option} className="flex items-center space-x-3 p-3 rounded-md hover:bg-gray-800 cursor-pointer">
                  <input 
                    type="radio" 
                    name="itemOption" 
                    value={option} 
                    checked={selectedOption === option} 
                    onChange={(e) => setSelectedOption(e.target.value)} 
                    className="h-5 w-5 text-yellow-500 focus:ring-yellow-500" 
                  />
                  <span className="text-white">{option}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-4">
              <button onClick={handleCloseOptionsModal} className="px-4 py-2 text-sm font-medium text-gray-200 bg-gray-600 rounded-lg hover:bg-gray-500">
                Cancelar
              </button>
              <button onClick={handleAddOptionItem} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700">
                Adicionar ao Pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- Pop-up de Item Adicionado (lendo do contexto) --- */}
      {addedItemName && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-2 border-yellow-500 text-white p-5 rounded-lg shadow-lg z-50 animate-pulse">
          <p className="text-lg font-semibold text-center">
            <span className="text-green-500">✔</span> {addedItemName}
          </p>
          <p className="text-sm text-gray-300 text-center">foi adicionado ao carrinho!</p>
        </div>
      )}

      {/* Mensagem de Sucesso (igual) */}
      {orderSuccess && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50">
          Pedido enviado com sucesso!
        </div>
      )}

      {/* Conteúdo Principal (Layout) */}
      <div className="container mx-auto max-w-7xl p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Coluna do Cardápio */}
        <div className="lg:col-span-2">
          {/* Seção de Burgers */}
          <section className="mb-6">
            <h3 className="text-3xl font-bebas tracking-wider font-bold mb-3 text-yellow-500 border-b border-gray-700 pb-1 uppercase">Hambúrgueres</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.burgers.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  // Passa apenas as funções de ABRIR o modal
                  onAddBurger={handleOpenBurgerModal}
                  onAddOptionItem={handleOpenOptionsModal}
                />
              ))}
            </div>
          </section>

          {/* --- NOVA SEÇÃO: Monte seu Hambúrguer --- */}
          <section className="mb-6">
            <h3 className="text-3xl font-bebas tracking-wider font-bold mb-3 text-yellow-500 border-b border-gray-700 pb-1 uppercase">Monte seu Hambúrguer</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.buildYourOwn.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  // Passa apenas as funções de ABRIR o modal
                  onAddBurger={handleOpenBurgerModal}
                  onAddOptionItem={handleOpenOptionsModal}
                />
              ))}
            </div>
          </section>
          {/* --- FIM DA NOVA SEÇÃO --- */}

          {/* Seção de Acompanhamentos */}
          <section className="mb-6">
            <h3 className="text-3xl font-bebas tracking-wider font-bold mb-3 text-yellow-500 border-b border-gray-700 pb-1 uppercase">Batata</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.sides.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddBurger={handleOpenBurgerModal}
                  onAddOptionItem={handleOpenOptionsModal}
                />
              ))}
            </div>
          </section>

          {/* Seção de Sucos */}
          <section className="mb-6">
            <h3 className="text-3xl font-bebas tracking-wider font-bold mb-3 text-yellow-500 border-b border-gray-700 pb-1 uppercase">Sucozinhos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.juices.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddBurger={handleOpenBurgerModal}
                  onAddOptionItem={handleOpenOptionsModal}
                />
              ))}
            </div>
          </section>

          {/* Seção de Refrigerantes */}
          <section>
            <h3 className="text-3xl font-bebas tracking-wider font-bold mb-3 text-yellow-500 border-b border-gray-700 pb-1 uppercase">Bebidas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuData.sodas.map((item) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  onAddBurger={handleOpenBurgerModal}
                  onAddOptionItem={handleOpenOptionsModal}
                />
              ))}
            </div>
          </section>
        </div>

        {/* Coluna do Carrinho/Checkout */}
        <aside className="lg:col-span-1">
          <div className="sticky top-4 bg-gray-900 p-5 rounded-lg shadow-lg border border-gray-700">
            <h2 className="text-3xl font-bebas tracking-wider font-bold uppercase text-red-600 mb-4 border-b border-gray-700 pb-2 text-center">
              Meu Pedido
            </h2>
            
            {/* Itens do Carrinho (lendo 'cart' do contexto) */}
            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center">Seu carrinho está vazio.</p>
              ) : (
                cart.map((item) => (
                  <CartItem
                    key={item.cartItemId || item.id}
                    item={item}
                    // Não precisa mais de props de função!
                  />
                ))
              )}
            </div>
            
            {/* Total (usando 'calculateTotal' do contexto) */}
            {cart.length > 0 && (
              <div className="text-xl font-bold text-right my-4 text-yellow-500">
                Total: R$ {calculateTotal().toFixed(2).replace('.', ',')}
              </div>
            )}
            
            {/* Formulário de Checkout (igual) */}
            {cart.length > 0 && (
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <h3 className="text-2xl font-bebas tracking-wider font-semibold text-yellow-500">Seus Dados</h3>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Nome</label>
                  <input type="text" name="name" value={formData.name} onChange={handleFormChange} required className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Telefone (WhatsApp)</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} required className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Endereço Completo</label>
                  <input type="text" name="address" placeholder="Rua, Número, Bairro" value={formData.address} onChange={handleFormChange} required className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Forma de Pagamento</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="payment" value="dinheiro" checked={formData.payment === 'dinheiro'} onChange={handleFormChange} className="focus:ring-yellow-500 text-yellow-500" />
                      <span className="text-gray-200">Dinheiro</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="payment" value="pix" checked={formData.payment === 'pix'} onChange={handleFormChange} className="focus:ring-yellow-500 text-yellow-500" />
                      <span className="text-gray-200">PIX</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="radio" name="payment" value="cartao" checked={formData.payment === 'cartao'} onChange={handleFormChange} className="focus:ring-yellow-500 text-yellow-500" />
                      <span className="text-gray-200">Cartão</span>
                    </label>
                  </div>
                </div>

                {/* --- CAMPO CONDICIONAL DE TROCO --- */}
                {formData.payment === 'dinheiro' && (
                  <div className="animate-fade-in">
                    <label className="block text-sm font-medium text-gray-400 mb-1">Precisa de troco?</label>
                    <input 
                      type="text" 
                      name="changeFor" 
                      placeholder="Ex: Troco para R$ 50,00" 
                      value={formData.changeFor} 
                      onChange={handleFormChange} 
                      className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 text-white" 
                    />
                  </div>
                )}
                {/* --- FIM DO CAMPO DE TROCO --- */}

                {formError && (
                  <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm">
                    {formError}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full p-3 font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Finalizar Pedido
                </button>
              </form>
            )}
          </div>
        </aside>
      </div>
    </div>
  </>
  );
}

// --- 4. COMPONENTE "ROOT" QUE "PROVÊ" O CONTEXTO ---

// Este é o novo componente padrão que você deve exportar.
export default function InsanoBurgerApp() {
  return (
    <CartProvider>
      <App />
    </CartProvider>
  );
}
