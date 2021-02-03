/*
 * @Author: ZWH
 * @Email: zhangwh@uway.com
 * @Date: 2021-01-08 10:46:29
 * @Description: form表单
 * @LastEditTime: 2021-02-01 13:44:40
 */

'use strict';

import React, { createElement, cloneElement, Children } from 'react';

//插件
import { Row, Col, Form, Input, Button, Select, DatePicker, Checkbox } from 'antd';
import PropTypes from 'prop-types';
import classnams from 'classnames';

//样式
import style from './index.less';

//常量
const RangePicker = DatePicker.RangePicker;
const FormItem = Form.Item,
  { Option } = Select,
  c = createElement;

const FormData = props => {
  const { formClass, formColumns, formValue, form, children } = props;
  const { getFieldDecorator, validateFields, getFieldsValue, resetFields } = form;

  let formItem = {
    labelCol: {
      xs: { span: 6 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 18 },
      sm: { span: 18 },
    },
  };

  //提交表单方法
  const btnFunction = {
    //提交表单
    onSubmitValues: e => {
      e.preventDefault();
      validateFields((error, values) => {
        if (error) {
          return;
        }
        formValue(values);
      });
    },

    //重置方法
    onReset: () => {
      resetFields();
    },
  };

  //表单样式
  const components = {
    //输入框
    input: ({ placeholder, field, ruleValue = {}, prefix, inputType }) => {
      return getFieldDecorator(field, { ...ruleValue })(
        <Input placeholder={placeholder} prefix={prefix} type={inputType} />,
      );
    },

    //下拉框
    select: ({ placeholder, field, ruleValue = {}, selectLists = [] }) => {
      return getFieldDecorator(field, { ...ruleValue })(
        c(
          Select,
          { placeholder, onChange: () => {} },
          selectLists.map(({ id, label }) => c(Option, { key: id, value: `${id}` }, label)),
        ),
      );
    },

    //日期
    date: ({ placeholder, field, ruleValue = {} }) => {
      return getFieldDecorator(field, { ...ruleValue })(<DatePicker placeholder={placeholder} />);
    },
    range: ({ placeholder, field, ruleValue = {} }) => {
      return getFieldDecorator(field, { ...ruleValue })(<RangePicker placeholder={placeholder} />);
    },

    //复选框
    check: ({ labelText, field, ruleValue = {} }) => {
      return getFieldDecorator(field, { ...ruleValue })(<Checkbox>{labelText}</Checkbox>);
    },

    //操作按钮
    btn: ({ btnLists = [] }) => {
      return btnLists.map(({ type, title, btnClass, clickFuc }, index) =>
        c(Button, { className: btnClass, onClick: btnFunction[clickFuc], type, key: index }, title),
      );
    },
  };

  //   //子元素传参
  //   const childrenHtml = Children.map(children, child => {
  //     return cloneElement(child, { onSubmit: onAppSub, reset: onReset });
  //   });

  return (
    <Form
      className={classnams(style.formStyle, formClass)}
      //   onSubmit={onSubmitValues}
      autoComplete="off"
    >
      <Row>
        {formColumns.map((columns, index) => {
          let { type, label, formItemClass, formItemLayout, colSpan = 24 } = columns;
          type = columns.type || 'input';
          formItemLayout = formItemLayout || formItem;
          return (
            <Col span={colSpan} key={index}>
              <FormItem {...formItemLayout} className={formItemClass} label={label}>
                {components[type](columns)}
              </FormItem>
            </Col>
          );
        })}
      </Row>

      {/* <div>{childrenHtml}</div> */}
    </Form>
  );
};

FormData.defaultProps = {
  formValue: values => {
    console.log(values);
  },
  formColumns: new Array(),
};

FormData.propTypes = {
  formValue: PropTypes.func,
  formColumns: PropTypes.array,
};

export default Form.create()(FormData);

/**
 * @params_parent:
 *
 * formClass:整个表单的外部样式,
 * formColumns:form表单想要展示的内容,
 * formValue:提交表单时获取数据进行下面的操作,
 *
 *
 * @params_child:
 * type:该条数据展示的类型 input/select/checkbox/datePicker/rangePicker,
 * label:存在值时显示左侧内容、不存在时只有输入框和选择框,
 * formItemClass:自定义formItem样式,
 * formItemLayout:label和编辑框占比,
 * colSpan:col行中占比
 *
 */
