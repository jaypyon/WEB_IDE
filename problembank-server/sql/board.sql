CREATE TABLE problemboard (
    post_id INT AUTO_INCREMENT PRIMARY KEY,
    problem_num INT,
    written_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    post_title VARCHAR(255) NOT NULL,
    post_content VARCHAR(2000) NOT NULL,
    post_sourcecode VARCHAR(5000)
);

CREATE TABLE boardcomment (
    post_id INT NOT NULL,
    comment_id INT AUTO_INCREMENT PRIMARY KEY,
    comment_content VARCHAR(1000),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

insert into boardcomment(post_id,comment_content) values(1,"안녕하세요");

insert into problemboard(problem_num,post_title,post_content,post_sourcecode) 
values(1,"제목입니다.","이 문제를 모르겠어요, 블라블라","#include<lorem.ipsum>\n\r blah blah");