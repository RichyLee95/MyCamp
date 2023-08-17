import { profileLink } from "../../About";
import './Footer.css'
const About = () => {
    const { linkedin: linkedin, github: github, email: email } = profileLink;


    return (
        <footer className="about-footer">
            <div className='about-containers'>
                <span className="about-text">Created by Richard Lee </span>
            <span className='About3'>
                <a href={github} >
                    <i className="fab fa-github"></i>
                </a>
                <a href={linkedin} >
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href={`mailto:${email}`}>
                    <i className="fas fa-envelope"></i>
                </a>
            </span>
            </div>


            
        </footer>
    )
}


export default About

