import React, { PureComponent, Fragment } from 'react';
import { Table, Alert, Collapse } from 'antd';
import styles from './index.less';

function initTotalList (columns) {
  const totalList = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends PureComponent {
  constructor (props) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  static getDerivedStateFromProps (nextProps) {
    // clean state
    if (nextProps.selectedRows.length === 0) {
      const needTotalList = initTotalList(nextProps.columns);
      return {
        selectedRowKeys: [],
        needTotalList,
      };
    }
    return null;
  }

  handleRowSelectChange = (selectedRowKeys, selectedRows) => {
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex], 10), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }

    this.setState({ selectedRowKeys, needTotalList });
  };

  handleTableChange = (pagination, filters, sorter) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter);
    }
  };

  cleanSelectedKeys = () => {
    this.handleRowSelectChange([], []);
  };

  render () {
    const { selectedRowKeys, needTotalList } = this.state;
    const {
      data: { list, pagination },
      rowKey,
      ...rest
    } = this.props;

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    };

    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: record => ({
        disabled: record.disabled,
      }),
    };

    const Panel = Collapse.Panel;

    function callback (key) {
      console.log(key);
    }

    const text = `7.5mm AKOYA REARL AND DIAMOND DANGLE EAR 700090 - 1SDE1488 (10450 pts)`;

    return (
      <div className={styles.standardTable}>
        {/*        <div className={styles.tableAlert}>
          <Alert
            message={
              <Fragment>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a> 项&nbsp;&nbsp;
                {needTotalList.map(item => (
                  <span style={{ marginLeft: 8 }} key={item.dataIndex}>
                    {item.title}
                    总计&nbsp;
                    <span style={{ fontWeight: 600 }}>
                      {item.render ? item.render(item.total) : item.total}
                    </span>
                  </span>
                ))}
                <a onClick={this.cleanSelectedKeys} style={{ marginLeft: 24 }}>
                  清空
                </a>
              </Fragment>
            }
            type="info"
            showIcon
          />
        </div>*/}
        {/*<Table*/}
        {/*rowKey={rowKey || 'key'}*/}
        {/*// rowSelection={rowSelection}*/}
        {/*dataSource={list}*/}
        {/*pagination={paginationProps}*/}
        {/*onChange={this.handleTableChange}*/}
        {/*{...rest}*/}
        {/*/>*/}
        <Collapse onChange={callback}>
          <Panel header={
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingRight: '20px' }}>
              <div>ORDER DATE<br/> 10 Apr 2016</div>
              <div>ORDER # <br/>NM00026911</div>
              <div>TOTAL # <br/>$ 1572.16</div>
              <div>ITEMS # <br/>2</div>
              <div>WEB ORDER # <br/>NM00026911</div>
              <div>PARENT ORDER # <br/>NM00026911</div>
              <div>INVOICE # <br/>NM00026911</div>
            </div>
          }
                 key="1"
          >
            <Collapse defaultActiveKey="1">
              <Panel header={
                <div
                  style={{ display: 'flex', flexFlow: 'row', paddingRight: '20px' }}>
                  <div style={{ marginRight: '50px' }}>Delivery Item</div>
                  <div>Store: Montreal store</div>
                </div>
              } key="1">
                <div>
                  <div style={{
                    height: '70px',
                    display: 'flex',
                    flexFlow: 'row',
                    justifyContent: 'space-between',
                    paddingRight: '20px',
                    // borderBottom: '1px solid lightgray',
                  }}>
                    <div>{text}</div>
                    <div>
                      <div>Actual price: $1100.00</div>
                      <div>Discount: $55.00</div>
                      <div>Sell Price: $1045.00</div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
            <Collapse defaultActiveKey="2" style={{marginTop: '10px'}}>
              <Panel header={
                <div
                  style={{ display: 'flex', flexFlow: 'row', paddingRight: '20px' }}>
                  <div style={{ marginRight: '50px' }}>Pickup Item</div>
                  <div>Store: Montreal store</div>
                </div>
              } key="2">
                <div>
                  <div style={{
                    height: '70px',
                    display: 'flex',
                    flexFlow: 'row',
                    justifyContent: 'space-between',
                    paddingRight: '20px',
                    // borderTop: '1px solid lightgray',
                  }}>
                    <div>{text}</div>
                    <div>
                      <div>Actual price: $1100.00</div>
                      <div>Discount: $55.00</div>
                      <div>Sell Price: $1045.00</div>
                    </div>
                  </div>
                </div>
              </Panel>
            </Collapse>
          </Panel>
          <Panel header={
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingRight: '20px' }}>
              <div>ORDER DATE<br/> 10 Apr 2016</div>
              <div>ORDER # <br/>NM00026911</div>
              <div>TOTAL # <br/>$ 1572.16</div>
              <div>ITEMS # <br/>2</div>
              <div>WEB ORDER # <br/>NM00026911</div>
              <div>PARENT ORDER # <br/>NM00026911</div>
              <div>INVOICE # <br/>NM00026911</div>
            </div>
          } key="2">
            <div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel header={
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingRight: '20px' }}>
              <div>ORDER DATE<br/> 10 Apr 2016</div>
              <div>ORDER # <br/>NM00026911</div>
              <div>TOTAL # <br/>$ 1572.16</div>
              <div>ITEMS # <br/>2</div>
              <div>WEB ORDER # <br/>NM00026911</div>
              <div>PARENT ORDER # <br/>NM00026911</div>
              <div>INVOICE # <br/>NM00026911</div>
            </div>
          } key="3">
            <div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel header={
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingRight: '20px' }}>
              <div>ORDER DATE<br/> 10 Apr 2016</div>
              <div>ORDER # <br/>NM00026911</div>
              <div>TOTAL # <br/>$ 1572.16</div>
              <div>ITEMS # <br/>2</div>
              <div>WEB ORDER # <br/>NM00026911</div>
              <div>PARENT ORDER # <br/>NM00026911</div>
              <div>INVOICE # <br/>NM00026911</div>
            </div>
          } key="4">
            <div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
            </div>
          </Panel>
          <Panel header={
            <div style={{ display: 'flex', flexFlow: 'row', justifyContent: 'space-between', paddingRight: '20px' }}>
              <div>ORDER DATE<br/> 10 Apr 2016</div>
              <div>ORDER # <br/>NM00026911</div>
              <div>TOTAL # <br/>$ 1572.16</div>
              <div>ITEMS # <br/>2</div>
              <div>WEB ORDER # <br/>NM00026911</div>
              <div>PARENT ORDER # <br/>NM00026911</div>
              <div>INVOICE # <br/>NM00026911</div>
            </div>
          } key="5">
            <div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
              <div style={{
                height: '70px',
                display: 'flex',
                flexFlow: 'row',
                justifyContent: 'space-between',
                paddingRight: '20px',
                borderBottom: '1px solid lightgray',
              }}>
                <div>{text}</div>
                <div>
                  <div>Actual price: $1100.00</div>
                  <div>Discount: $55.00</div>
                  <div>Sell Price: $1045.00</div>
                </div>
              </div>
            </div>
          </Panel>
        </Collapse>
      </div>
    );
  }
}

export default StandardTable;
