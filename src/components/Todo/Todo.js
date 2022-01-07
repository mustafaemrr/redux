import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Content from './Content'

function Todo() {
  return (
    <>
      <section className="todoapp">
        <Header />
        <Content />
      </section>
      <Footer />
    </>
  )
}

export default Todo
