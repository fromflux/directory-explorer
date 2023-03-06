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
      ],
  },
];

type TFileSystemEntry = ({
  type: string
  name: string
  added: string
  files?: undefined
} | {
  type: string
  name: string
  files: TFileSystemContent
  added?: undefined
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

function DirectoryExplorerEntry({
  entry, onClick,
}: { entry: TFileSystemEntry, onClick: Function }) {
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          onClick(entry);
        }}
      >
        {entry.type}
        {' '}
        {entry.name}
        {' '}
        {entry.added}
      </button>
    </li>
  );
}

export default function DirectoryExplorer() {
  const [state, dispatch] = useReducer(reduce, initialState);

  return (
    <div className="directory-explorer">
      <h1>Directory Explorer</h1>
      <ul>
        {state.current.parent && (
          <DirectoryExplorerEntry
            entry={{
              name: 'parent',
              type: 'folder',
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
