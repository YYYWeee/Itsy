import "./Footer.css";



export default function Footer() {
  return (
    <>
      <footer>
        <div className="footer-container">
          {/* <div className="footer-header">Let's connect</div> */}
          <div className="social">
            <a href='https://github.com/YYYWeee/Itsy' target="_blank" title="GitHub">
              <i className="fa-brands fa-github fa-2xl" ></i>
            </a>
            <a href='https://www.linkedin.com/in/wendy-kuo-32093773/' target="_blank" title="LinkedIn">

              <i className="fa-brands fa-linkedin fa-2xl"></i>
            </a>
          </div>
          <div className="footer-bottom">
            <p>©August 2023, Itsy is an Etsy Clone created by Wendy Kuo</p>
          </div>
        </div>
      </footer>
    </>
  );
}
