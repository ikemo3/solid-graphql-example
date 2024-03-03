import { Card, CardContent } from "@shared/ui";
import {
  closestCenter,
  createSortable,
  DragDropProvider,
  DragDropSensors,
  DragEventHandler,
  DragOverlay,
  Id,
  SortableProvider,
  useDragDropContext,
} from "@thisbeyond/solid-dnd";
import { createSignal, For } from "solid-js";

const Sortable = (props: { item: Id }) => {
  // props.item は変更されないので警告は無視する
  // eslint-disable-next-line solid/reactivity
  const sortable = createSortable(props.item);
  const context = useDragDropContext();
  const state = context && context[0];

  return (
    <Card
      ref={sortable}
      class="m-4 w-40 touch-none bg-blue-400 text-center"
      classList={{
        "opacity-25": sortable.isActiveDraggable,
        "transition-transform": !!state?.active.draggable,
      }}
    >
      <CardContent class="py-4">{props.item}</CardContent>
    </Card>
  );
};

const SortableVerticalListExample = () => {
  const [items, setItems] = createSignal<Id[]>([1, 2, 3]);
  const [activeItem, setActiveItem] = createSignal<Id | null>(null);
  const ids = () => items();

  const onDragStart: DragEventHandler = ({ draggable }) =>
    setActiveItem<Id>(draggable.id);

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids();
      const fromIndex = currentItems.indexOf(draggable.id);
      const toIndex = currentItems.indexOf(droppable.id);
      if (fromIndex !== toIndex) {
        const updatedItems = currentItems.slice();
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
        setItems(updatedItems);
      }
    }
  };

  return (
    <DragDropProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      collisionDetector={closestCenter}
    >
      <DragDropSensors />
      <div class="border-2 border-blue-100 p-2">
        <SortableProvider ids={ids()}>
          <For each={items()}>{(item) => <Sortable item={item} />}</For>
        </SortableProvider>
      </div>
      <DragOverlay>
        <Card class="bg-blue-400 text-center">
          <CardContent class="py-4">{activeItem()}</CardContent>
        </Card>
      </DragOverlay>
    </DragDropProvider>
  );
};

export default SortableVerticalListExample;
