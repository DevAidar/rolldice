import React from 'react';

import img1 from '../../images/RoundIcons-Free-Set-01.png';
import img2 from '../../images/RoundIcons-Free-Set-02.png';
import img3 from '../../images/RoundIcons-Free-Set-03.png';
import img4 from '../../images/RoundIcons-Free-Set-04.png';
import img5 from '../../images/RoundIcons-Free-Set-05.png';
import img6 from '../../images/RoundIcons-Free-Set-06.png';
import img7 from '../../images/RoundIcons-Free-Set-07.png';
import img8 from '../../images/RoundIcons-Free-Set-08.png';
import img9 from '../../images/RoundIcons-Free-Set-09.png';
import img10 from '../../images/RoundIcons-Free-Set-10.png';

import Header from '../../components/Header/Header';

import './Info.scss';

const Info = () => {
	return (
		<>
			<div className='container'>
				<div className='card mt-4'>
					<div className='card-header text-center bg-info text-white'>
            Choose your opponents
					</div>
					<form>
						<div className='card-body py-0'>
							<div className='card-profile'>
								<img src={img1} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Joe</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img2} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Dennis</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img3} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Benjamin</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img4} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Landon</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img5} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Maya</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img6} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Bob</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img7} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Dan</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img8} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Ben</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img9} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Fill</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
							<div className='card-profile'>
								<img src={img10} alt='' className='card-profile-img'/>
								<p className='attendee-name'>Sam</p>
								<div className="custom-control custom-checkbox my-auto">
									<input type="checkbox" className="custom-control-input"/>
									<label class="custom-control-label"/>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Info;
