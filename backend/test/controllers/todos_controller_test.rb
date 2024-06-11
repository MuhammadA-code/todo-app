require 'test_helper'

class TodosControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    @todo = todos(:todo1)
    sign_in @user
  end  

  test "should get index" do
    get todos_url
    assert_response :success
  end

  test "should create todo" do
    assert_difference('Todo.count') do
      post todos_url, params: { todo: { title: "New Todo", description: "Description", status: "pending" } }
    end

    assert_response :created
  end

  test "should not create todo with invalid params" do
    assert_no_difference('Todo.count') do
      post todos_url, params: { todo: { title: "", description: "Description", status: "pending" } }
    end

    assert_response :unprocessable_entity
  end

  test "should update todo" do
    patch todo_url(@todo), params: { todo: { title: "Updated Todo" } }
    assert_response :success
    @todo.reload
    assert_equal "Updated Todo", @todo.title
  end

  test "should destroy todo" do
    assert_difference('Todo.count', -1) do
      delete todo_url(@todo)
    end

    assert_response :no_content
  end

  test "should handle not found error" do
    delete todo_url(id: 'invalid-id')
    assert_response :not_found
  end
end