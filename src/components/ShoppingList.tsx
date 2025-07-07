
import React from 'react';
import ShoppingListForm from './shopping/ShoppingListForm';
import ShoppingListItems from './shopping/ShoppingListItems';
import { useShoppingList } from '@/hooks/useShoppingList';
import { useCountriesAndPharmacies } from '@/hooks/useCountriesAndPharmacies';

const ShoppingList = () => {
  const {
    items,
    formData,
    setFormData,
    loading,
    handleSubmit,
    togglePurchased,
    deleteItem
  } = useShoppingList();

  const { countries, pharmacies } = useCountriesAndPharmacies(formData.country);

  return (
    <div className="space-y-6">
      <ShoppingListForm
        formData={formData}
        setFormData={setFormData}
        countries={countries}
        pharmacies={pharmacies}
        loading={loading}
        onSubmit={handleSubmit}
      />

      <ShoppingListItems
        items={items}
        onTogglePurchased={togglePurchased}
        onDeleteItem={deleteItem}
      />
    </div>
  );
};

export default ShoppingList;
