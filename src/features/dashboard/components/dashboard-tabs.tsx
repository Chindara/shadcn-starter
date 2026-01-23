import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { DashboardTab } from "../types";
import { TAB_CONFIG } from "../types";
import { cn } from "@/lib/utils";

interface DashboardTabsProps {
  tabs: DashboardTab[];
  activeTabId: string;
  isEditMode: boolean;
  onTabChange: (tabId: string) => void;
  onAddTab: (title: string) => void;
  onDeleteTab: (tabId: string) => void;
}

export function DashboardTabs({
  tabs,
  activeTabId,
  isEditMode,
  onTabChange,
  onAddTab,
  onDeleteTab,
}: DashboardTabsProps) {
  const [isAddingTab, setIsAddingTab] = useState(false);
  const [newTabTitle, setNewTabTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isAddingTab && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingTab]);

  const handleAddClick = () => {
    setIsAddingTab(true);
    setNewTabTitle("");
  };

  const handleConfirmAdd = () => {
    if (newTabTitle.trim()) {
      onAddTab(newTabTitle);
    }
    setIsAddingTab(false);
    setNewTabTitle("");
  };

  const handleCancelAdd = () => {
    setIsAddingTab(false);
    setNewTabTitle("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleConfirmAdd();
    } else if (e.key === "Escape") {
      handleCancelAdd();
    }
  };

  const canDeleteTab = tabs.length > 1;
  const canAddTab = tabs.length < TAB_CONFIG.maxTabs;

  return (
    <div className="flex items-center gap-2 mb-4">
      <Tabs value={activeTabId} onValueChange={onTabChange} className="flex-1">
        <TabsList className="h-auto p-1 flex-wrap">
          {tabs.map((tab) => (
            <div key={tab.id} className="relative group flex items-center">
              <TabsTrigger
                value={tab.id}
                className={cn(
                  "pr-2",
                  isEditMode && canDeleteTab && "pr-7"
                )}
                title={tab.title}
              >
                <span className="max-w-[120px] truncate">{tab.title}</span>
              </TabsTrigger>
              {isEditMode && canDeleteTab && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0.5 h-5 w-5 opacity-60 hover:opacity-100 hover:bg-destructive/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteTab(tab.id);
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </TabsList>
      </Tabs>

      {isEditMode && (
        <div className="flex items-center gap-2">
          {isAddingTab ? (
            <div className="flex items-center gap-1">
              <Input
                ref={inputRef}
                value={newTabTitle}
                onChange={(e) => setNewTabTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleCancelAdd}
                placeholder="Tab name"
                className="h-8 w-32"
                maxLength={TAB_CONFIG.maxTitleLength}
              />
            </div>
          ) : (
            canAddTab && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddClick}
                className="h-8"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Tab
              </Button>
            )
          )}
        </div>
      )}
    </div>
  );
}
