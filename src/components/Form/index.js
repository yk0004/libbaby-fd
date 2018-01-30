import React, { Component } from 'react';
import Modal from 'antd/lib/modal';
import Form from 'antd/lib/form';
import Input from 'antd/lib/input';
import InputNumber from 'antd/lib/input-number';
import Upload from 'antd/lib/upload';
import Icon from 'antd/lib/icon';
const FormItem = Form.Item;

class PostForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
    };
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handlePreviewCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    console.log(file)
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => {
    this.setState({ fileList })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        if(this.props.mode === "post") {
          this.props.onPost(values.title, values.contents);
        } else if(this.props.mode === "edit") {
          const { onEdit, id, index } = this.props;
          onEdit(id, index, values.title, values.contents)
        } else {
          console.log("commet posst")
          const { onComment, id } = this.props;
          onComment(id, values.contents, values.price, this.state.fileList );
        }

      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { mode, title, contents, visible, onCancel, card_title } = this.props;
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const titleView = (
      <FormItem label="요청물품">
        {getFieldDecorator('title', {
          rules: [{ required: true, message: '물품명을 입력하세요.' },],
          initialValue: title
        })(
          <Input />
        )}
      </FormItem>
    );

    const commentView = (
      <div>
      <FormItem label="가격">
        {getFieldDecorator('price', {
          rules: [{ required: true, message: '물품명을 입력하세요.' },],
          initialValue: 0
        })(
          <InputNumber
             formatter={value => `\u20A9 ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
             parser={value => value.replace(/\u20A9\s?|(,*)/g, '')}
          />
        )}
      </FormItem>
      <FormItem label="사진첨부">
        {getFieldDecorator('photo')(
          <div className="clearfix">
             <Upload
               listType="picture-card"
               fileList={fileList}
               onPreview={this.handlePreview}
               onChange={this.handleChange}
             >
               {fileList.length >= 3 ? null : uploadButton}
             </Upload>
             <Modal visible={previewVisible} footer={null} onCancel={this.handlePreviewCancel}>
               <img alt="example" style={{ width: '100%' }} src={previewImage}/>
             </Modal>
           </div>
        )}
      </FormItem>
    </div>
    );

    return (
      <Modal
       title={card_title}
       visible={visible}
       onOk={this.handleSubmit}
       onCancel={onCancel}
      >
         <Form layout="vertical" onSubmit={this.handleSubmit} hideRequiredMark={true}>
           {mode !== "comment" ? titleView : undefined}
           <FormItem label="세부사항">
             {getFieldDecorator('contents',{
               rules: [{ required: true, message: '세부사항을 입력하세요.' }],
               initialValue: contents
             })(<Input.TextArea autosize={true} />)}
           </FormItem>
           {mode === "comment" ? commentView : undefined}
         </Form>
      </Modal>
    );
  }
}

export default Form.create()(PostForm);
