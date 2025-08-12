import { type FC } from 'react'
import './index.less'

const Contact: FC = () => {
  return (
    <div className="contact-page">
      <h1 className="title">联系我们</h1>
      
      <div className="contact-info">
        <h2 className="section-title">联系方式</h2>
        <div className="contact-methods">
          <div className="contact-item">
            <span className="contact-icon">📧</span>
            <span className="contact-text">邮箱: example@email.com</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📱</span>
            <span className="contact-text">电话: +86 123-4567-8900</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">🏢</span>
            <span className="contact-text">地址: 中国北京市</span>
          </div>
        </div>
      </div>
      
      <div className="contact-form">
        <h3 className="form-title">给我们留言</h3>
        <div className="form-container">
          <form>
            <div className="form-group">
              <input 
                type="text" 
                placeholder="您的姓名" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                placeholder="您的邮箱" 
                className="form-input"
              />
            </div>
            <div className="form-group">
              <textarea 
                placeholder="您的留言" 
                rows={4}
                className="form-input form-textarea"
              />
            </div>
            <button 
              type="submit"
              className="submit-button"
            >
              发送留言
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
