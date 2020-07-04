import React, { Component } from 'react';
import {Card, CardBody, CardImg, CardText, CardTitle} from 'reactstrap';

class DishDetail extends Component {
    // constructor(props) {
    //     super(props);
    // }

    renderDish(dish) {
        return (
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>
                        {dish.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    }

    renderComments(comments) {
        if(comments==null)
            return <div></div>;
        else {
            const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
            
            const temp = comments.map((comment) => {
                let d = new Date(comment.date);
                return (
                    <div key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {month[d.getMonth()]} {d.getDay()}, {d.getFullYear()}</p>
                    </div>
                );
            });

            return (
                <div>
                    <h4>Comments</h4>
                    <div>
                        {temp}
                    </div>
                </div>
            );
        }
    }

    render() {
        if(this.props.dish !=null ) {
            return (
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.dish.comments)}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div></div>
            );
        }
    }
}

export default DishDetail;