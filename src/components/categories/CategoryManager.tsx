import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleDot, Edit2, Trash2, Plus } from "lucide-react";

interface Category {
  id: string;
  label: string;
  color: string;
  icon?: string;
}

interface CategoryManagerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  categories?: Category[];
  onSave?: (categories: Category[]) => void;
}

const defaultCategories: Category[] = [
  { id: "1", label: "Food & Dining", color: "#FF6B6B" },
  { id: "2", label: "Transportation", color: "#4ECDC4" },
  { id: "3", label: "Shopping", color: "#45B7D1" },
  { id: "4", label: "Bills & Utilities", color: "#96CEB4" },
];

const CategoryManager = ({
  open = true,
  onOpenChange = () => {},
  categories = defaultCategories,
  onSave = () => {},
}: CategoryManagerProps) => {
  const [localCategories, setLocalCategories] =
    React.useState<Category[]>(categories);
  const [editingCategory, setEditingCategory] = React.useState<Category | null>(
    null,
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-[800px] max-h-[600px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Manage Categories</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Category List */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Color</TableHead>
                <TableHead>Category Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {localCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {category.label}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setEditingCategory(category)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setLocalCategories(
                            localCategories.filter((c) => c.id !== category.id),
                          );
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Add New Category Button */}
          <Button
            onClick={() => {
              setEditingCategory({
                id: String(Date.now()),
                label: "",
                color: "#000000",
              });
            }}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Category
          </Button>

          {/* Edit Category Dialog */}
          {editingCategory && (
            <Dialog
              open={!!editingCategory}
              onOpenChange={(open) => !open && setEditingCategory(null)}
            >
              <DialogContent className="bg-white sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory.id ? "Edit Category" : "New Category"}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Input
                      type="color"
                      value={editingCategory.color}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          color: e.target.value,
                        })
                      }
                      className="col-span-1"
                    />
                    <Input
                      placeholder="Category name"
                      value={editingCategory.label}
                      onChange={(e) =>
                        setEditingCategory({
                          ...editingCategory,
                          label: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setEditingCategory(null)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        if (editingCategory.id) {
                          setLocalCategories(
                            localCategories.map((c) =>
                              c.id === editingCategory.id ? editingCategory : c,
                            ),
                          );
                        } else {
                          setLocalCategories([
                            ...localCategories,
                            editingCategory,
                          ]);
                        }
                        setEditingCategory(null);
                        onSave(localCategories);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryManager;
