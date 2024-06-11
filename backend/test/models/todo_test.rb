require "test_helper"

class TodoTest < ActiveSupport::TestCase
  def setup
    @user_one = users(:one)
    @user_two = users(:two)
    @todo1 = todos(:todo1)
    @todo2 = todos(:todo2)
    @todo3 = todos(:todo3)
  end

  test "should return all todos for status 'all'" do
    todos = Todo.apply_filters({status: 'all'}, @user_one)
    assert_equal 3, todos.count
  end

  test "should return only pending todos" do
    todos = Todo.apply_filters({status: 'pending'}, @user_one)
    assert_equal 2, todos.count
    assert todos.all? { |todo| todo.pending? }
  end

  test "should return only completed todos" do
    todos = Todo.apply_filters({status: 'completed'}, @user_one)
    assert_equal 1, todos.count
    assert todos.all? { |todo| todo.completed? }
  end

  test "should return both pending and completed todos" do
    todos = Todo.apply_filters({status: ['pending', 'completed']}, @user_one)
    assert_equal 3, todos.count
  end

  test "should return all todos when status is not present" do
    todos = Todo.apply_filters({}, @user_one)
    assert_equal 3, todos.count
  end
end