import { BsFillHouseDoorFill as House } from 'react-icons/bs';
import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

export default function sideBar() {
  return S.list()
    .title(`Slater's Slices`)
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => (
          <strong>
            <House />
          </strong>
        ))
        .child(
          S.editor().schemaType('storeSettings').documentId('original-location')
        ),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
