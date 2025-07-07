
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

interface ShoppingItem {
  id: string;
  medication_name: string;
  pharmacy_name: string;
  is_purchased: boolean;
}

interface ShoppingListItemsProps {
  items: ShoppingItem[];
  onTogglePurchased: (itemId: string, isPurchased: boolean) => void;
  onDeleteItem: (itemId: string) => void;
}

const ShoppingListItems: React.FC<ShoppingListItemsProps> = ({
  items,
  onTogglePurchased,
  onDeleteItem
}) => {
  if (items.length === 0) {
    return null;
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Your Shopping List</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={item.is_purchased}
                onCheckedChange={() => onTogglePurchased(item.id, item.is_purchased)}
              />
              <div>
                <p className={`font-medium ${item.is_purchased ? 'line-through text-gray-500' : ''}`}>
                  {item.medication_name}
                </p>
                <p className="text-sm text-gray-600">
                  {item.pharmacy_name}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDeleteItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ShoppingListItems;
