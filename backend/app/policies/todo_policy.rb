class TodoPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    user_is_owner?
  end

  def create?
    user.present?
  end

  def update?
    user_is_owner?
  end

  def destroy?
    user_is_owner?
  end

  private

  def user_is_owner?
    record.user == user
  end
end