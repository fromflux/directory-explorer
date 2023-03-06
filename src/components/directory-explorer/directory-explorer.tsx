/* eslint-disable no-use-before-define */

import React, { useReducer } from 'react';

import './directory-explorer.css';

const fileSystemMock = [
  {
    type: 'pdf',
    name: 'Employee Handbook',
    added: '2017-01-06',
  },
  {
    type: 'pdf',
    name: 'Public Holiday policy',
    added: '2016-12-06',
  },
  {
    type: 'folder',
    name: 'Expenses',
    added: '2017-02-06',
    files:
      [
        {
          type: 'doc',
          name: 'Expenses claim form',
          added: '2017-05-02',
        },
        {
          type: 'doc',
          name: 'Fuel allowances',
          added: '2017-05-03',
        },
      ],
  },
  {
    type: 'csv',
    name: 'Cost centres',
    added: '2016-08-12',
  },
  {
    type: 'folder',
    name: 'Misc',
    added: '2012-07-05',
    files:
      [
        {
          type: 'doc',
          name: 'Christmas party',
          added: '2017-12-01',
        },
        {
          type: 'mov',
          name: 'Welcome to the company!',
          added: '2015-04-24',
        },
        {
          type: 'folder',
          name: 'Inner',
          added: '2012-07-05',
          files:
            [
              {
                type: 'doc',
                name: 'Some inner entry',
                added: '2012-11-05',
              },
              {
                type: 'cpp',
                name: 'Unknown type',
                added: '2023-03-06',
              },
            ],
        },
      ],
  },
];

type TFileSystemEntry = ({
  type: string
  name: string
  added?: string
  files?: undefined
} | {
  type: string
  name: string
  added?: string
  files: TFileSystemContent
})

type TFileSystemContent = TFileSystemEntry[]

type TFileSystem = {
  parent: TFileSystem | null
  content: TFileSystemContent
}

type TState = {
  current: TFileSystem
  filter: string
}

const initialState = {
  current: {
    parent: null,
    content: fileSystemMock,
  },
  filter: '',
};

type TAction = {
  type: 'openDirectory',
  directory: TFileSystemContent
} | {
  type: 'openParent',
}

function reduce(state: TState, action: TAction) {
  switch (action.type) {
    case 'openDirectory':
      return {
        ...state,
        current: {
          parent: state.current,
          content: action.directory,
        },
      };
    case 'openParent':
      return {
        ...state,
        current: {
          parent: state.current.parent!.parent,
          content: state.current.parent!.content,
        },
      };
    default:
      return state;
  }
}

const fileTypeIconNames = {
  folder: 'folder_a',
  pdf: 'pdf',
  csv: 'csv',
  doc: 'doc',
  mov: 'mov',
};

function getIconFilename(type: string): string {
  return fileTypeIconNames[type as keyof typeof fileTypeIconNames] || 'null';
}

function DirectoryExplorerEntry({
  entry, onClick,
}: { entry: TFileSystemEntry, onClick: Function }) {
  return (
    <li className="file-browser-entry">
      <button
        type="button"
        onClick={() => {
          onClick(entry);
        }}
      >
        <img src={`icons/${getIconFilename(entry.type)}.png`} alt="pdf icon" width="32" height="32" />

        <span>{entry.name}</span>

        <span>{entry.type}</span>

        <span>{entry.added}</span>

      </button>
    </li>
  );
}

export default function DirectoryExplorer() {
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <div className="directory-explorer">
      <h1>Directory Explorer</h1>
      <ul className="file-browser">
        <li className="file-browser-header">
          <span> </span>
          <span>Name</span>
          <span>Type</span>
          <span>Added</span>
        </li>
        {state.current.parent && (
          <DirectoryExplorerEntry
            entry={{
              name: 'parent',
              type: 'folder',
              added: '',
              files: [],
            }}
            onClick={() => {
              dispatch({ type: 'openParent' });
            }}
          />
        )}
        {state.current.content.map((entry) => (
          <DirectoryExplorerEntry
            key={entry.name}
            entry={entry}
            onClick={(currEntry: TFileSystemEntry) => {
              if (currEntry.type === 'folder') {
                dispatch({ type: 'openDirectory', directory: currEntry.files! });
              } else {
                // eslint-disable-next-line no-alert
                alert(`Viewing file: "${entry.name}" added: ${entry.added}`);
              }
            }}
          />
        ))}
      </ul>
    </div>
  );
}
