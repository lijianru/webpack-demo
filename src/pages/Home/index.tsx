import { Button, Table } from 'antd';
import { createSelector } from 'reselect';
import { useSelector, useDispatch } from 'react-redux';
import React, { ReactElement, useEffect, useCallback } from 'react';

import { renderLog } from 'utils/log';
import { AppState } from 'store/index';
import { getAllExamples } from 'store/actions/exampleAction';
import { Example, Author } from 'store/reducers/exampleReducer';

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Author',
    dataIndex: 'author',
    key: 'author_id',
    // eslint-disable-next-line react/display-name
    render: (author: Author): ReactElement => (
      <div>
        <h3>{author.loginname}</h3>
        <img src={author.avatar_url} />
      </div>
    ),
  },
  {
    title: 'Visit',
    dataIndex: 'visit_count',
    key: 'visit_count',
  },
];

const selectList = createSelector(
  (state: AppState) => state.exampleState.examples,
  (examples: Example[]) => examples.filter((example) => example.id)
);

export function Home(): ReactElement {
  const examples: Example[] = useSelector(selectList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllExamples());
  }, [dispatch]);

  const getData = useCallback(() => {
    dispatch(getAllExamples());
  }, [dispatch]);

  renderLog('Home render!!!');
  return (
    <div>
      <section>
        <Button onClick={getData}>TEST</Button>
      </section>
      <Table columns={columns} dataSource={examples} rowKey={(record): string => record.id} />
    </div>
  );
}

export default Home;
