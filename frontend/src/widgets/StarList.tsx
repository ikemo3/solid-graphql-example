import { starsQuery } from "@shared/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@shared/ui";
import { formatISO } from "date-fns";
import { createResource, For } from "solid-js";

export const StarList = () => {
  const [stars] = createResource(starsQuery);

  return (
    <>
      <h1>Star List</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Constellation</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            <For each={stars()?.data?.stars}>
              {(star) => (
                <TableRow>
                  <TableCell>{star.id}</TableCell>
                  <TableCell>{star.name}</TableCell>
                  <TableCell>{star.constellation.name}</TableCell>
                  <TableCell>{formatISO(star.createdAt)}</TableCell>
                  <TableCell>{formatISO(star.updatedAt)}</TableCell>
                </TableRow>
              )}
            </For>
          }
        </TableBody>
      </Table>
    </>
  );
};
