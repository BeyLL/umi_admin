/**
 * 分页组件
 */
exports = module.exports = function(pages) {
  let _this = this;
  this.current = (pages && pages.current) || 1;
  this.pageSize = (pages && pages.pageSize) || 10;
  this.total = (pages && pages.total) || 0;
  this.dispatch = (pages && pages.dispatch) || null;
  this.dispatchType = (pages && pages.dispatchType) || '';
  this.params = (pages && pages.params) || {};
  this.showSizeChanger = (pages && pages.showSizeChanger) || false;
  this.showQuickJumper = (pages && pages.showQuickJumper) || false;
  this.changeRequest = pages && typeof pages.request !== 'undefined' ? pages.request : true;
  this.pageSizeOptions = (pages && pages.pageSizeOptions) || ['10', '20', '30', '40', '50'];
  this.size = 'middle';

  this.setPage = function(pages) {
    _this.total = pages.total ? pages.total : 0;
    _this.pageSize = pages.pageSize || _this.pageSize;
    _this.current =
      pages.current ||
      Math.min.apply({}, [
        _this.current,
        Math.floor((_this.total + _this.pageSize - 1) / _this.pageSize) || 1,
      ]);
    _this.dispatch = pages.dispatch || _this.dispatch;
    _this.dispatchType = pages.dispatchType || _this.dispatchType;
    _this.params = pages.params || _this.params;
  };
  this.showTotal = function(total, range) {
    return `第${range[0]}-${range[1]}条  共 ${total} 条`;
  };
  this.onChange = function(page, pageSize) {
    _this.current = page;
    _this.pageSize = pageSize;
    if (!_this.changeRequest) return;
    const action = {
      type: _this.dispatchType,
      payload: {
        pageNum: page,
        pageSize: pageSize,
      },
    };

    Object.assign(action.payload, _this.params);

    _this.dispatch(action);
  };
  this.onShowSizeChange = function(current, size) {
    _this.current = current;
    _this.pageSize = size;
    if (!_this.changeRequest) return;
    const action = {
      type: _this.dispatchType,
      payload: {
        pageNum: 1,
        pageSize: size,
      },
    };

    Object.assign(action.payload, _this.params);

    _this.dispatch(action);
  };
};
