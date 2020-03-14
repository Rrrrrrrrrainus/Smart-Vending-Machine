import React from 'react';
import  MainLayout from '../components/Layout/MainLayout'
import FAQ from '../components/FAQ'
import '../styles/components/_faq.scss'

class Help extends React.Component {
    constructor(props) {
      super(props);
      this.state= {
          faq:[
            {question:"shuai?",
            answer:"shuai!",
            open:false
          },
          {question:"sheng?",
            answer:"sheng!",
            open:false
          },
        ]
      }
      }

      toggleFAQ = index =>{
          this.setState(this.state.faq.map((faq,i) => {
            if(i === index){
                faq.open = !faq.open
            } else {
                faq.open = false
            }
          }))
      }
    
    render() {
    

        return (
          <MainLayout breakpoint={this.props.breakpoint}>
              <div className = "faqs">
                  {this.state.faq.map((faq,i) => (
                      <FAQ key = {i} faq={faq} index = {i} toggleFAQ = {this.toggleFAQ}/>
                  ))}
              </div>
          </MainLayout>
        )}

}

export default Help;