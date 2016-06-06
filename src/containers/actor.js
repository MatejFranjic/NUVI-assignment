import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';
import $ from 'jquery';
import { fetchPosts } from '../actions/index';
import { Accordion, Panel } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Loader from 'react-loader';

export class Actor extends Component{

	componentWillMount(){
		this.props.fetchPosts();
	}

	componentDidUpdate(){
		const stateThis = this;
		function renderDOM(action, self){	
			var parent = $(self).closest('.custom').attr('id');	
			console.log(parent);	
			switch(action){
				case 'like':					
					let likes = $('#'+parent+' .likes-span').text();
		  		$('#'+parent+' .likes-span').text(++likes);
		  		break;
		  	case 'comment':
		  		$('#'+parent+' .activity-comment').toggle();
					$('#'+parent+' .btn-submit').on('click', function(event){
						event.preventDefault();
						let comment = $('#'+parent+' .textarea-comment').val();						
						if(!comment || comment == ''){
							$('#'+parent+' .alert.alert-danger').css('display', 'block');
							return;
						}											
						let newDiv = '<div class="single-comment">'+comment+'</div>'						
						$('#'+parent+' .comments-list').append(newDiv);
						let commentsNumber = $('#'+parent+' .comments-span').text();
						$('#'+parent+' .comments-span').text(++commentsNumber);
						$('#'+parent+' .textarea-comment').val('');
						$('#'+parent+' .alert.alert-danger').css('display', 'none!important');
					});
		  		break; 		
			}			
		}
		//likes increment
		$(document).ready(function(){
		 $('.fa.fa-thumbs-o-up').on('click', function(){
		 		var self = this;		  		 			 
		    renderDOM('like', self);	    		    
		 });
		});
		//comments
		$('.fa.fa-comment-o').on('click', function(){			
			renderDOM('comment', this);
		});
	}

	renderDate(date){
		const arrayDate = date.split('-');
		const stringDate = `${arrayDate[1]}/${arrayDate[2]}/${arrayDate[0]}`
		return stringDate;
	}

	renderContent(post){
		return(
			<div className="list-item custom col-lg-4" id={ post.id } key={ post.id }>
				<div>
					<a href={ post.actor_url } target="_blank">
						<img className="avatar-img" src={ post.actor_avator } alt="actor avatar" width="100px"/>
					</a>
					<h3 className="h3"><a href={ post.actor_url } target="_blank">{ post.actor_username }</a> has posted: </h3>
				</div>
				<div className="act-body"> 
					<div>
						<h4 className="h4">	{ post.activity_message } </h4>
					</div>	
					<div className="date">Posted on: { this.renderDate(post.activity_date) }</div>
					<a className="btn btn-primary act-link" href={ post.activity_url } target="_blank">Read more</a>
					<a className="btn btn-primary" href={ post.activity_attachment } target="_blank">View activity picture</a>
					<div className="data-container">
						<div className="like-container">
							<FontAwesome name="thumbs-o-up" /><span value={ post.activity_likes } className="likes-span">{ post.activity_likes }</span>
						</div>
						<div>
							<FontAwesome name="comment-o" /> <span className="comments-span">{ post.activity_comments }</span>
						</div>
						<div>
							<FontAwesome name="share-alt" /> <span>{ post.activity_shares }</span>
						</div>
					</div>
				</div>
				<div className="activity-comment">
					<form className="form-group">
						<textarea className="textarea-comment" placeholder="Write a comment..."/>
						<div className="alert alert-danger">
							Please check your input
						</div>
						<button className="btn btn-primary btn-submit">Submit comment</button>
					</form>
					<div className="comments-list">
						
					</div>
				</div>
			</div>
		);
	}

	render(){
		if(!this.props.posts){
			return(
				<Loader loaded={false} lines={13} length={20} width={10} radius={30} corners={1} rotate={0} direction={1} color="#000" speed={1} trail={60} shadow={false} hwaccel={false} className="spinner" zIndex={2e9} top="50%" left="50%" scale={1.00} loadedClassName="loadedContent" />
			);
		}

		return(
			<div className="row">
				<div className="col-lg-12">
					<Accordion>
    				<Panel header="Facebook" eventKey="1" className="facebook">
    					<h3 className="h3">These are all activities posted on Facebook</h3>
     					 { this.props.posts.posts.map( (post) => {      	
			  		    	if(post.provider == "facebook"){										
										return ( this.renderContent(post) );
									}	
			 					 }) 
    					}
    				</Panel>
    				<Panel header="Twitter" eventKey="2" className="twitter"> 
      				<h3 className="h3">These are all activities posted on Twitter</h3>
      					{ this.props.posts.posts.map( (post) => {      	
			 				    	if(post.provider == "twitter"){										
											return ( this.renderContent(post) );
										}	
			 						 }) 
    						}
   					</Panel>
    				<Panel header="Instagram" eventKey="3" className="instagram">
     					<h3 className="h3">These are all activities posted on Instagram</h3>
     						{ this.props.posts.posts.map( (post) => {      	
		   				  	 	if(post.provider == "instagram"){										
											return ( this.renderContent(post)	);
										}	
		  						}) 
   							}
    				</Panel>
   				 	<Panel header="Tumblr" eventKey="4" className="tumblr">
     				 <h3 className="h3">These are all activities posted on Tumblr</h3>
    				  { this.props.posts.posts.map( (post) => {      	
			   			   	if(post.provider == "tumblr"){										
										return ( this.renderContent(post) );
									}	
			  				}) 
    					}
    				</Panel>
  				</Accordion>
				</div>
			</div>
			);			
	}
}
function mapStateToProps({ posts }){
	console.log('mapStateToProps',posts);
	return { posts };
}
function mapDispatchToProps(dispatch){
	return bindActionCreators( {fetchPosts}, dispatch );
}
export default connect(mapStateToProps, mapDispatchToProps)(Actor);